import { Endpoint } from '@ideagate/model/core/endpoint/endpoint'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getEntrypoints } from '#/api/grpc/entrypoint'

export default function useEntrypoints() {
  const { project_id, app_id } = useParams()

  const [entrypoints, setEntrypoints] = useState<Endpoint[]>([])

  const rqEntrypoints = useQuery({
    queryKey: ['entrypoints', project_id, app_id],
    queryFn: () => getEntrypoints({ projectId: project_id, applicationId: app_id }),
  })

  useEffect(() => {
    setEntrypoints(rqEntrypoints.data?.endpoints || [])
  }, [rqEntrypoints.data?.endpoints])

  const searchEntrypoints = (search: string) => {
    const originalEntrypoints = rqEntrypoints.data?.endpoints || []

    const entrypointsFiltered = originalEntrypoints.filter((entrypoint) => {
      const searchTerm = search.toLowerCase()
      const name = entrypoint.name.toLowerCase()

      let isSettingMatch = false

      if (entrypoint.settings.oneofKind === 'settingRest') {
        const path = entrypoint.settings.settingRest.path.toLowerCase()
        const method = entrypoint.settings.settingRest.method.toLowerCase()

        isSettingMatch = path.includes(searchTerm) || method.includes(searchTerm)
      }

      return isSettingMatch || name.includes(searchTerm)
    })

    setEntrypoints(entrypointsFiltered)
  }

  return {
    entrypoints,
    refetchEntrypoints: rqEntrypoints.refetch,
    searchEntrypoints,
  }
}
