import { CreateEndpointRequest, GetListEndpointRequest } from '@ideagate/model/dashboard/endpoint'

import { dashboardService } from './init'

export async function getEntrypoints(req: Partial<GetListEndpointRequest>) {
  const resp = await dashboardService.getListEndpoint(GetListEndpointRequest.create(req))
  return resp.response
}

export async function createEndpoint(req: Partial<CreateEndpointRequest>) {
  const resp = await dashboardService.createEndpoint(CreateEndpointRequest.create(req))
  return resp.response
}
