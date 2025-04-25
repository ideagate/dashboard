import { Workflow } from '@ideagate/model/core/endpoint/workflow'

import { Edge, Node } from '../types/graph'

export function workflowToGraph(workflow: Workflow): {
  nodes: Array<Node>
  edges: Array<Edge>
} {
  const nodes: Array<Node> = workflow.steps.map((step) => ({
    id: step.id,
    type: step.type.toString(),
    position: {
      x: step.graph?.positionX || 0,
      y: step.graph?.positionY || 0,
    },
    data: {
      step: step,
    },
  }))

  const edges: Array<Edge> = workflow.edges.map((edge) => ({
    animated: true,
    id: edge.id,
    source: edge.source,
    target: edge.dest,
    data: {
      edge: edge,
    },
  }))

  return { nodes, edges }
}
