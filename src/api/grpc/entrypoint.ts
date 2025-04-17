import { Endpoint } from '@ideagate/model/core/endpoint/endpoint'
import { CreateEndpointRequest, GetListEndpointRequest } from '@ideagate/model/dashboard/endpoint'

import { dashboardService } from './init'

export async function getEntrypoints(req: Partial<GetListEndpointRequest>) {
  const resp = await dashboardService.getListEndpoint(GetListEndpointRequest.create(req))
  return resp.response
}

export async function createEntrypoint(entrypoint: Partial<Endpoint>) {
  const req = CreateEndpointRequest.create({
    endpoint: entrypoint,
  })

  const resp = await dashboardService.createEndpoint(req)
  return resp.response
}
