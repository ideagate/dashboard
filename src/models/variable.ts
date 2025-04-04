export type Tvar = {
  name: string
  type: 'string' | 'int' | 'float' | 'bool'
  required: boolean
  value: unknown
  default: unknown
}
