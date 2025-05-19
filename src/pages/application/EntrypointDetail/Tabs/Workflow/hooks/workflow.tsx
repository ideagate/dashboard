import { Edge as PbEdge, Step as PbStep, StepType, Workflow } from '@ideagate/model/core/endpoint/workflow'
import { Box } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  OnConnectEnd,
  ReactFlowProps as ReactFlowPropsOriginal,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import { createContext, FC, useCallback, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { getWorkflows, updateWorkflow } from '#/api/grpc/workflow'

import { Edge, Node } from '../types/graph'
import { graphEdgesToWorkflowEdges, graphNodesToWorkflowSteps, workflowToGraph } from '../utils/graph'

type ReactFlowProps = ReactFlowPropsOriginal<Node, Edge>

interface WorkflowContextType {
  workflows: Workflow[]
  workflow: Workflow | null
  isLoading: boolean
  saveWorkflow: () => void

  nodes: Node[]
  edges: Edge[]
  onNodesChange: ReactFlowProps['onNodesChange']
  onEdgesChange: ReactFlowProps['onEdgesChange']
  onConnectEnd: ReactFlowProps['onConnectEnd']

  currentVersion: bigint
  setCurrentVersion: (version: bigint) => void
}

const WorkflowContext = createContext<WorkflowContextType>({
  workflows: [],
  workflow: null,
  isLoading: true,
  saveWorkflow: () => {},
  nodes: [],
  edges: [],
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnectEnd: () => {},
  currentVersion: 0n,
  setCurrentVersion: () => {},
})

const WorkflowProviderBody: FC<{ children: React.ReactNode }> = (props) => {
  const { project_id, app_id, entrypoint_id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  // Fetch workflow data
  const { data, isLoading, refetch } = useQuery<{ workflows: Workflow[]; workflow: Workflow }>({
    queryKey: ['workflows', project_id, app_id, entrypoint_id],
    queryFn: async () => {
      const respWorkflows = await getWorkflows({
        projectId: project_id,
        applicationId: app_id,
        entrypointId: entrypoint_id,
      })

      if (respWorkflows.workflows.length === 0) {
        return { workflows: [], workflow: Workflow.create() }
      }

      const respWorkflow = await getWorkflows({
        projectId: project_id,
        applicationId: app_id,
        entrypointId: entrypoint_id,
        version: getCurrentVersion(),
      })

      const { nodes, edges } = workflowToGraph(respWorkflow.workflows[0])
      setNodes(nodes)
      setEdges(edges)

      return {
        workflows: respWorkflows.workflows,
        workflow: respWorkflow?.workflows[0] || null,
      }
    },
    initialData: {
      workflows: [],
      workflow: Workflow.create(),
    },
  })

  // Mutation function to save workflow
  const rmWorkflow = useMutation({
    mutationFn: async (workflow: Workflow) => {
      updateWorkflow({ workflow })
    },
  })

  // React flow state
  const { nodes: initialNodes, edges: initialEdges } = workflowToGraph(data.workflow)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const { screenToFlowPosition } = useReactFlow()
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

  const saveWorkflow = async () => {
    const newWorkflow: Workflow = {
      ...data.workflow,
      steps: graphNodesToWorkflowSteps(nodes),
      edges: graphEdgesToWorkflowEdges(edges),
    }
    await rmWorkflow.mutateAsync(newWorkflow)
  }

  // Current version
  const getCurrentVersion = () => {
    if (!searchParams.has('version')) {
      return BigInt(data.workflows[0]?.version || 0)
    }
    return BigInt(searchParams.get('version') || 0)
  }
  const setCurrentVersion = (version: bigint) => {
    setSearchParams((prev) => ({ ...prev, version: version.toString() }), { replace: true })
    refetch()
  }

  return (
    <WorkflowContext.Provider
      value={{
        workflows: data.workflows,
        workflow: data.workflow,
        isLoading,
        saveWorkflow,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnectEnd,
        currentVersion: getCurrentVersion(),
        setCurrentVersion: setCurrentVersion,
      }}
    >
      {!isLoading ? props.children : <Box>Loading Workflow ...</Box>}
    </WorkflowContext.Provider>
  )
}

export const WorkflowProvider: FC<{ children: React.ReactNode }> = ({ children }) => (
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
