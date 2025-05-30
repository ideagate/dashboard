import { StepType } from '@ideagate/model/core/endpoint/workflow'

import NodeEnd from './NodeEnd'
import NodeMysql from './NodeMysql'
import NodeSleep from './NodeSleep'
import NodeStart from './NodeStart'

export const nodeTypes = {
  [StepType.START.toString()]: NodeStart,
  [StepType.END.toString()]: NodeEnd,
  [StepType.SLEEP.toString()]: NodeSleep,
  [StepType.MYSQL.toString()]: NodeMysql,
}
