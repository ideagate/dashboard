import { StepType } from '@ideagate/model/core/endpoint/workflow'
import { IconDatabase, IconFlag, IconPlayerPlay, IconQuestionMark, IconZzz } from '@tabler/icons-react'
import { ReactNode } from 'react'

type NodeAttribute = {
  type: StepType
  name: string
  icon: ReactNode
  color: string
}

const nodeAttributes: Array<NodeAttribute> = [
  {
    type: StepType.START,
    name: 'Start',
    icon: <IconPlayerPlay />,
    color: '#474e93',
  },
  {
    type: StepType.END,
    name: 'End',
    icon: <IconFlag />,
    color: '#474e93',
  },
  {
    type: StepType.MYSQL,
    name: 'MySQL',
    icon: <IconDatabase />,
    color: '#7e5cad',
  },
  {
    type: StepType.SLEEP,
    name: 'Sleep',
    icon: <IconZzz />,
    color: '#7e5cad',
  },
]

const nodeAttributeUnknown: NodeAttribute = {
  type: 0,
  name: 'Unknown',
  icon: <IconQuestionMark />,
  color: '#474e93',
}

export const getNodeAttributesByType = (type: StepType): NodeAttribute => {
  return nodeAttributes.find((attr) => attr.type === type) || nodeAttributeUnknown
}

export const getNodeAttributesByTypeString = (type: string): NodeAttribute => {
  return nodeAttributes.find((attr) => attr.type.toString() === type) || nodeAttributeUnknown
}
