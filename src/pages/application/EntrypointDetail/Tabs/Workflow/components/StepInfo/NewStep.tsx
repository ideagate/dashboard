import { StepType } from '@ideagate/model/core/endpoint/workflow'
import { Box, Typography } from '@mui/material'
import { DragEventHandler, FC } from 'react'

import { getNodeAttributesByType } from '../../models/nodeAttributes'

const NewStep: FC = () => {
  return (
    <Box>
      <Typography variant="h3">Insert New Node</Typography>
      <Typography mb={3}>Drag node into workflow graph</Typography>
      <Box display="flex" flexWrap="wrap">
        <Node stepType={StepType.START} />
        <Node stepType={StepType.END} />
        <Node stepType={StepType.MYSQL} />
        <Node stepType={StepType.SLEEP} />
      </Box>
    </Box>
  )
}

const Node: FC<{ stepType: StepType }> = ({ stepType }) => {
  const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.setData('text/plain', stepType.toString())
    event.dataTransfer.effectAllowed = 'move'
  }

  const nodeAttribute = getNodeAttributesByType(stepType)

  return (
    <Box
      component="div"
      className="cursor-move p-3 hover:drop-shadow-2xl"
      onDragStart={onDragStart}
      draggable
      sx={{ transform: 'translate(0,0)' }}
    >
      <Box
        component="div"
        className={`bg-[${nodeAttribute.color}]  p-[15px] rounded-[15px] w-fit`}
        sx={{ color: 'white' }}
      >
        {nodeAttribute.icon}
      </Box>
      <Typography textAlign="center" fontWeight="bold" mt={0.5}>
        {nodeAttribute.name}
      </Typography>
    </Box>
  )
}

export default NewStep
