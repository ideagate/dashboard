import { GetListApplicationRequest } from '@bayu-aditya/ideagate-model-js/dashboard/application'
import { DashboardServiceClient } from '@bayu-aditya/ideagate-model-js/dashboard/service.client'

import { transport } from './transport'

const dashboardService = new DashboardServiceClient(transport)

export async function getListApps(req: Partial<GetListApplicationRequest>) {
  const resp = await dashboardService.getListApplication(GetListApplicationRequest.create(req))
  return resp.response
}
