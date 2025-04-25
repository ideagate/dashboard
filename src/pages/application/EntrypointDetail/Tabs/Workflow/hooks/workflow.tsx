import { Edge as PbEdge, Step as PbStep, StepType, Workflow } from '@ideagate/model/core/endpoint/workflow'
import { Box } from '@mui/material'
import {
  OnConnectEnd,
  ReactFlowProps as ReactFlowPropsOriginal,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import { createContext, useCallback, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { mockWorkflow } from '../models/mock'
import { Edge, Node } from '../types/graph'
import { workflowToGraph } from '../utils/graph'

type ReactFlowProps = ReactFlowPropsOriginal<Node, Edge>

interface WorkflowContextType {
  workflow: Workflow
  isLoading: boolean
  saveWorkflow: () => void

  nodes: Node[]
  edges: Edge[]
  onNodesChange: ReactFlowProps['onNodesChange']
  onEdgesChange: ReactFlowProps['onEdgesChange']
  onConnectEnd: ReactFlowProps['onConnectEnd']
}

const WorkflowContext = createContext<WorkflowContextType>({
  workflow: null as unknown as Workflow,
  isLoading: true,
  saveWorkflow: () => {},
  nodes: [],
  edges: [],
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnectEnd: () => {},
})

const WorkflowProviderBody: React.FC<{ children: React.ReactNode }> = (props) => {
  // const { project_id, app_id, entrypoint_id } = useParams()

  // // Fetch workflow data
  // const { data, isLoading } = useQuery({
  //   queryKey: ['workflow', project_id, app_id, entrypoint_id],
  // })
  const workflow = mockWorkflow as Workflow
  const isLoading = false

  const { screenToFlowPosition } = useReactFlow()

  const { nodes: initialNodes, edges: initialEdges } = workflowToGraph(workflow)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // const onConnect = useCallback(
  //   (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
  //   [setEdges]
  // )

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      const createNewEdge = (sourceId: string, targetId: string): Edge => {
        const newEdgeId = uuidv4()
        return {
          id: newEdgeId,
          source: sourceId,
          target: targetId,
          animated: true,
          data: {
            edge: PbEdge.create({
              id: newEdgeId,
              source: sourceId,
              dest: targetId,
            }),
          },
        }
      }

      if (connectionState.isValid) {
        // when a connection is dropped on a existing node
        // create a new connection to an existing node
        const newEdge = createNewEdge(connectionState.fromNode?.id || '', connectionState.toNode?.id || '')
        setEdges((eds) => eds.concat(newEdge))
      } else {
        // when a connection is dropped on the pane
        // create a new node
        const newNodeId = uuidv4()
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
        const newNode: Node = {
          id: newNodeId,
          type: StepType.SLEEP.toString(),
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: {
            step: PbStep.create({
              id: newNodeId,
              name: 'Sleep',
              type: StepType.SLEEP,
            }),
          },
          origin: [0, 0.5],
        }
        setNodes((nds) => nds.concat(newNode))

        // creeate a new connection to the new node
        const newEdge = createNewEdge(connectionState.fromNode?.id || '', newNodeId)
        setEdges((eds) => eds.concat(newEdge))
      }
    },
    [screenToFlowPosition, setEdges, setNodes]
  )

  const saveWorkflow = () => {
    const newWorkflow: Workflow = {
      ...workflow,
      steps: nodes.map((node) => node.data.step),
      edges: edges.map((edge) => edge.data.edge),
    }

    console.log('saveWorkflow', newWorkflow)
  }

  return (
    <WorkflowContext.Provider
      value={{
        workflow,
        isLoading,
        saveWorkflow,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnectEnd,
      }}
    >
      {workflow != null ? props.children : <Box>Loading Workflow ...</Box>}
    </WorkflowContext.Provider>
  )
}

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ReactFlowProvider>
    <WorkflowProviderBody>{children}</WorkflowProviderBody>
  </ReactFlowProvider>
)

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkflow = (): WorkflowContextType => {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }

  return context
}
