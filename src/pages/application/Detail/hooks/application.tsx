import { Application } from '@bayu-aditya/ideagate-model-js/core/application/application'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, ReactNode, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { getListApps } from '#/api/grpc/application'

interface ApplicationContextType {
  app: Application | null
  isLoading: boolean
}

const ApplicationContext = createContext<ApplicationContextType>({
  app: null,
  isLoading: true,
})

export const ApplicationProvider: React.FC<{ children: ReactNode }> = (props) => {
  const { project_id, app_id } = useParams()

  // Fetch application data
  const { data, isLoading } = useQuery({
    queryKey: ['app', project_id, app_id],
    queryFn: () => getListApps({ projectId: project_id, applicationId: app_id }),
  })
  const app = data?.applications?.[0] || null

  return <ApplicationContext.Provider value={{ app, isLoading }}>{props.children}</ApplicationContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApplication = (): ApplicationContextType => {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider')
  }

  return context
}
