import { DashboardServiceClient } from '@ideagate/model/dashboard/service.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const transport = new GrpcWebFetchTransport({
  baseUrl: 'https://apis-ideagate.bayuaditya.dev',
  format: 'text',
})

export const dashboardService = new DashboardServiceClient(transport)
