import { StepType } from '@ideagate/model/core/endpoint/workflow'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useWorkflow } from '../../hooks/workflow'
import NewStep from './NewStep'
import StepDetailMysql from './StepDetailMysql'
import StepDetailSleep from './StepDetailSleep'

const StepDetail: FC = () => {
  const [searchParams] = useSearchParams()
  const { nodes } = useWorkflow()

  const stepId = searchParams.get('step_id')

  const node = nodes.find((node) => node.id === stepId)
  const step = node?.data.step
  if (step == undefined) {
    return <NewStep />
  }

  switch (step.type) {
    case StepType.SLEEP:
      return <StepDetailSleep key={step.id} step={step} />
    case StepType.MYSQL:
      return <StepDetailMysql key={step.id} step={step} />
  }

  return <NewStep />
}

export default StepDetail
