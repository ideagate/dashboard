import { StepType } from '@ideagate/model/core/endpoint/workflow'

import NodeEnd from './NodeEnd'
import NodeSleep from './NodeSleep'
import NodeStart from './NodeStart'

export const nodeTypes = {
  [StepType.START.toString()]: NodeStart,
  [StepType.SLEEP.toString()]: NodeSleep,
  [StepType.END.toString()]: NodeEnd,
}
