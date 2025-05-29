import { Edge as PbEdge, Step as PbStep, Workflow } from '@ideagate/model/core/endpoint/workflow'
import { Box } from '@mui/material'
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  OnConnectEnd,
  ReactFlowProps as ReactFlowPropsOriginal,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import { createContext, DragEvent, FC, useCallback, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { getWorkflows, updateWorkflow } from '#/api/grpc/workflow'

import { nodeTypes } from '../components/Pipeline/nodes'
import { Edge, Node } from '../types/graph'
import { graphEdgesToWorkflowEdges, graphNodesToWorkflowSteps, workflowToGraph } from '../utils/graph'

type ReactFlowProps = ReactFlowPropsOriginal<Node, Edge>

interface WorkflowContextType {
  workflow: Workflow | null
  isLoading: boolean
  saveWorkflow: () => void
  showStepInfo: (stepId: string) => void

  nodes: Node[]
  edges: Edge[]
  onDrop: ReactFlowProps['onDrop']
  onDragOver: ReactFlowProps['onDragOver']
  onNodesChange: ReactFlowProps['onNodesChange']
  onEdgesChange: ReactFlowProps['onEdgesChange']
  onConnectEnd: ReactFlowProps['onConnectEnd']
  setNodeStepById: (id: string, stepFunc: (prevStep: PbStep) => PbStep) => void

  currentVersion: bigint
}

const WorkflowContext = createContext<WorkflowContextType>({
  workflow: null,
  isLoading: true,
  saveWorkflow: () => {},
  showStepInfo: () => {},
  nodes: [],
  edges: [],
  onDrop: () => {},
  onDragOver: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnectEnd: () => {},
  setNodeStepById: () => {},
  currentVersion: 0n,
})

const WorkflowProviderBody: FC<{ children: React.ReactNode }> = (props) => {
  const { project_id: projectId, app_id: applicationId, entrypoint_id: entrypointId } = useParams()
  if (!projectId || !applicationId || !entrypointId) {
    throw new Error('Project ID, Application ID, and Entrypoint ID are required to fetch workflows')
  }

  const [, setSearchParams] = useSearchParams()

  // React flow state
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  // Fetch workflow data
  const { data, isLoading } = useQueryWorkflow({ projectId, applicationId, entrypointId, setNodes, setEdges })

  // Mutation function to save workflow
  const rmWorkflow = useMutation({
    mutationFn: async (workflow: Workflow) => {
      updateWorkflow({ workflow })
    },
  })

  const { screenToFlowPosition } = useReactFlow()

  const onConnectEnd: OnConnectEnd = useCallback(
    (_, connectionState) => {
      // when a connection is dropped on the pane
      // ignore it
      if (!connectionState.isValid) {
        return
      }

      // when a connection is dropped on a existing node
      // create a new connection to an existing node
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

      const newEdge = createNewEdge(connectionState.fromNode?.id || '', connectionState.toNode?.id || '')
      setEdges((eds) => eds.concat(newEdge))
    },
    [setEdges]
  )

  const onDragOver: ReactFlowProps['onDragOver'] = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const onDrop: ReactFlowProps['onDrop'] = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      // create a new node
      const newNodeId = uuidv4()
      const stepType = event.dataTransfer.getData('text/plain') as string

      // check if the step type is valid
      if (nodeTypes[stepType] == null) {
        return
      }

      const { clientX, clientY } = event
      const newNode: Node = {
        id: newNodeId,
        type: stepType,
        position: screenToFlowPosition({
          x: clientX,
          y: clientY,
        }),
        data: {
          step: PbStep.create({
            id: newNodeId,
            name: 'Sleep',
            type: Number(stepType),
          }),
        },
        origin: [0.5, 0.5],
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  const setNodeStepById: WorkflowContextType['setNodeStepById'] = (id, stepFunc) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) {
          return node
        }

        return {
          ...node,
          data: {
            ...node.data,
            step: stepFunc(node.data.step),
          },
        }
      })
    )
  }

  // Save workflow
  const saveWorkflow = async () => {
    if (!data?.workflow) {
      console.error('No workflow to save')
      return
    }

    const newWorkflow: Workflow = {
      ...data.workflow,
      steps: graphNodesToWorkflowSteps(nodes),
      edges: graphEdgesToWorkflowEdges(edges),
    }
    await rmWorkflow.mutateAsync(newWorkflow)
  }

  const showStepInfo = (stepId: string) => {
    setSearchParams(
      (prev) => {
        prev.set('step_id', stepId)
        return prev
      },
      { replace: true }
    )
  }

  if (isLoading) {
    return <Box>Loading Workflow ...</Box>
  }

  if (data?.workflow == null) {
    return <Box>No workflow found</Box>
  }

  return (
    <WorkflowContext.Provider
      value={{
        workflow: data.workflow,
        isLoading,
        saveWorkflow,
        showStepInfo,
        nodes,
        edges,
        onDrop,
        onDragOver,
        onNodesChange,
        onEdgesChange,
        onConnectEnd,
        setNodeStepById,
        currentVersion: data.version,
      }}
    >
      {props.children}
    </WorkflowContext.Provider>
  )
}

const useQueryWorkflow = (arg: {
  projectId: string
  applicationId: string
  entrypointId: string
  setNodes: ReturnType<typeof useNodesState<Node>>[1]
  setEdges: ReturnType<typeof useEdgesState<Edge>>[1]
}): UseQueryResult<{
  workflow: Workflow | null
  version: bigint
}> => {
  const { projectId, applicationId, entrypointId, setNodes, setEdges } = arg

  const [searchParams, setSearchParams] = useSearchParams()

  return useQuery({
    queryKey: ['workflows', projectId, applicationId, entrypointId],
    queryFn: async () => {
      // Determine the curent version, using latest version if not specified
      let currentVersion = 0n
      if (searchParams.has('version')) {
        currentVersion = BigInt(searchParams.get('version') || 0)
      } else {
        // If no version is specified, fetch the latest version
        const resp = await getWorkflows({ projectId, applicationId, entrypointId })
        currentVersion = resp?.workflows[0]?.version || 0n
      }
      setSearchParams(
        (prev) => {
          prev.set('version', currentVersion.toString())
          return prev
        },
        { replace: true }
      )

      // Fetch the specific workflow for the current version
      const respWorkflow = await getWorkflows({
        projectId,
        applicationId,
        entrypointId,
        version: currentVersion,
      })

      const workflow = respWorkflow?.workflows[0]
      currentVersion = workflow.version

      // Set workflow to graph
      const { nodes, edges } = workflowToGraph(workflow)
      setNodes(nodes)
      setEdges(edges)

      return {
        workflow: workflow || null,
        version: currentVersion,
      }
    },
  })
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
