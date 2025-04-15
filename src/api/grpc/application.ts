import { GetListApplicationRequest } from '@ideagate/model/dashboard/application'

import { dashboardService } from './init'

export async function getListApps(req: Partial<GetListApplicationRequest>) {
  const resp = await dashboardService.getListApplication(GetListApplicationRequest.create(req))
  return resp.response
}
