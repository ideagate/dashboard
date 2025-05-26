import '@xyflow/react/dist/style.css'

import { Background, BackgroundVariant, MiniMap, ReactFlow } from '@xyflow/react'
import { FC } from 'react'

import { useWorkflow } from '../../hooks/workflow'
import Control from './Control'
import { nodeTypes } from './nodes'

const Workflow: FC = () => {
  const { nodes, edges, onDrop, onDragOver, onNodesChange, onEdgesChange, onConnectEnd } = useWorkflow()

  return (
    <div style={{ width: '100%', height: '600px', backgroundColor: 'white' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
    </div>
  )
}

export default Workflow
