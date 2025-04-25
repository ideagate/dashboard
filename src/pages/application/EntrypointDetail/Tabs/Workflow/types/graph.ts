import { Edge as PbEdge, Step as PbStep } from '@ideagate/model/core/endpoint/workflow'
import { Edge as TEdge, Node as TNode } from '@xyflow/react'

export type Node = TNode<{ step: PbStep }>
export type Edge = TEdge & {
  data: {
    edge: PbEdge
  }
}
