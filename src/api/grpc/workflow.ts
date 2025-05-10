import {
  CreateWorkflowRequest,
  DeleteWorkflowRequest,
  GetWorkflowsRequest,
  UpdateWorkflowRequest,
} from '@ideagate/model/dashboard/workflow'

import { dashboardService } from './init'

export async function getWorkflows(req: Partial<GetWorkflowsRequest>) {
  const resp = await dashboardService.getWorkflows(GetWorkflowsRequest.create(req))
  return resp.response
}

export async function createWorkflow(opt: CreateWorkflowRequest & { fromVersion?: bigint }) {
  const req = CreateWorkflowRequest.create(opt)

  const resp = await dashboardService.createWorkflow(req)
  return resp.response
}

export async function updateWorkflow(opt: UpdateWorkflowRequest) {
  const req = UpdateWorkflowRequest.create(opt)

  const resp = await dashboardService.updateWorkflow(req)
  return resp.response
}

export async function deleteWorkflow(req: DeleteWorkflowRequest) {
  const resp = await dashboardService.deleteWorkflow(req)
  return resp.response
}
