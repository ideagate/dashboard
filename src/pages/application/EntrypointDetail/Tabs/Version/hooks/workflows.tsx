import { Workflow } from '@ideagate/model/core/endpoint/workflow'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createContext, FC, ReactNode, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { createWorkflow, deleteWorkflow, getWorkflows } from '#/api/grpc/workflow'

type WorkflowsContextType = {
  workflows: Workflow[]
  isLoading: boolean
  refetch: () => void
  createVersion: (arg0: { fromVersion?: bigint }) => Promise<void>
  deleteVersion: (version: bigint) => Promise<void>
  changeVersion: (version: bigint) => void
}

const WorkflowsContext = createContext<WorkflowsContextType>({
  workflows: [],
  isLoading: true,
  refetch: () => {},
  createVersion: async () => Promise.resolve(),
  deleteVersion: async () => Promise.resolve(),
  changeVersion: () => {},
})

export const WorkflowsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { project_id, app_id, entrypoint_id } = useParams()

  const [, setSearchParams] = useSearchParams()

  // Fetch workflows data
  const {
    data: workflows = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['workflows', project_id, app_id, entrypoint_id],
    queryFn: () =>
      getWorkflows({
        projectId: project_id,
        applicationId: app_id,
        entrypointId: entrypoint_id,
      }),
    select: (data) => data.workflows,
  })

  // Create a new version
  const rmCreateVersion = useMutation({
    mutationFn: (data: { fromVersion?: bigint }) =>
      createWorkflow({
        projectId: project_id || '',
        applicationId: app_id || '',
        entrypointId: entrypoint_id || '',
        fromVersion: data.fromVersion ? BigInt(data.fromVersion) : 0n,
      }),
  })

  // Delete a version
  const rmDeleteVersion = useMutation({
    mutationFn: (version: bigint) =>
      deleteWorkflow({
        projectId: project_id || '',
        applicationId: app_id || '',
        entrypointId: entrypoint_id || '',
        version,
      }),
  })

  // Create a new version of the workflow
  const createVersion = async (data: { fromVersion?: bigint }) => {
    await rmCreateVersion.mutateAsync(data)
  }

  // Delete a version of the workflow
  const deleteVersion = async (version: bigint) => {
    await rmDeleteVersion.mutateAsync(version)
  }

  const changeVersion = (version: bigint) => {
    setSearchParams({ tab: 'workflow', version: version.toString() }, { replace: true })
  }

  return (
    <WorkflowsContext.Provider value={{ workflows, isLoading, refetch, createVersion, deleteVersion, changeVersion }}>
      {children}
    </WorkflowsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkflows = () => {
  const context = useContext(WorkflowsContext)
  if (!context) {
    throw new Error('useWorkflowsContext must be used within a WorkflowsProvider')
  }
  return context
}
