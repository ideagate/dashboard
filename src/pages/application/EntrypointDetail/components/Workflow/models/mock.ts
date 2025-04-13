import { useEdgesState, useNodesState } from '@xyflow/react'

export const mockNodes: Parameters<typeof useNodesState>[0] = [
  { id: '1', type: 'start', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', type: 'sleep', position: { x: 150, y: 0 }, data: { label: '2' } },
  { id: '3', type: 'sleep', position: { x: 300, y: 0 }, data: { label: '3' } },
  {
    id: '4',
    type: 'sleep',
    position: { x: 230, y: 100 },
    data: { label: '4' },
  },
  { id: '5', type: 'end', position: { x: 450, y: 0 }, data: { label: '5' } },
]

export const mockEdges: Parameters<typeof useEdgesState>[0] = [{ id: 'e1-2', source: '1', target: '2', animated: true }]
