export type Taction = {
  id: string
  dataSourceId: string
  queries: Array<string>
  path: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}
