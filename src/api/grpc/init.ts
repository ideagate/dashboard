import { DashboardServiceClient } from '@bayu-aditya/ideagate-model-js/dashboard/service.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const transport = new GrpcWebFetchTransport({
  baseUrl: 'http://localhost:50052',
  format: 'text',
})

export const dashboardService = new DashboardServiceClient(transport)
