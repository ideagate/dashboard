import '@xyflow/react/dist/style.css'

import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  MiniMap,
  Node,
  OnConnectEnd,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import { FC, useCallback } from 'react'

import { mockEdges, mockNodes } from '../../models/mock'
import Control from './Control'
import { nodeTypes } from './nodes'

const Workflow: FC = () => {
  return (
    <div style={{ width: '100%', height: '600px', backgroundColor: 'white' }}>
      <ReactFlowProvider>
        <ReactFlowBody />
      </ReactFlowProvider>
    </div>
  )
}

export default Workflow

let id = mockNodes.length + 1
const getId = () => `${id++}`

const ReactFlowBody: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(mockNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(mockEdges)

  const { screenToFlowPosition } = useReactFlow()

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  )

  // add new node when connection is dropped on the pane
  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId()
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
        const newNode: Node = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0, 0.5],
          type: 'sleep',
        }

        setNodes((nds) => nds.concat(newNode))
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectionState.fromNode?.id || '',
            target: id,
            animated: true,
          })
        )
      }
    },
    [screenToFlowPosition, setEdges, setNodes]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectEnd={onConnectEnd}
      proOptions={{ hideAttribution: true }}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.5 }}
      panOnScroll
    >
      <Control />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}
