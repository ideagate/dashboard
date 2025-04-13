import { GetListEndpointRequest } from '@bayu-aditya/ideagate-model-js/dashboard/endpoint'

import { dashboardService } from './init'

export async function getEntrypoints(req: Partial<GetListEndpointRequest>) {
  const resp = await dashboardService.getListEndpoint(GetListEndpointRequest.create(req))
  return resp.response
}
