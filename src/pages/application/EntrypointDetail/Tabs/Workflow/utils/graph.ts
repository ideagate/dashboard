import { Edge as PbEdge, Step as PbStep, Workflow } from '@ideagate/model/core/endpoint/workflow'

import { Edge, Node } from '../types/graph'

export function workflowToGraph(workflow: Workflow | null): {
  nodes: Array<Node>
  edges: Array<Edge>
} {
  if (!workflow) {
    return { nodes: [], edges: [] }
  }

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

export function graphNodesToWorkflowSteps(nodes: Node[]): PbStep[] {
  return nodes.map((node) => ({
    ...node.data.step,
    graph: {
      positionX: Math.round(node.position.x),
      positionY: Math.round(node.position.y),
    },
  }))
}

export function graphEdgesToWorkflowEdges(edges: Edge[]): PbEdge[] {
  return edges.map((edge) => ({
    ...edge.data.edge,
  }))
}
