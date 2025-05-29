import { StepType } from '@ideagate/model/core/endpoint/workflow'
import { Box, Typography } from '@mui/material'
import { IconDatabase, IconFlag, IconPlayerPlay, IconZzz } from '@tabler/icons-react'
import { DragEventHandler, FC, ReactNode } from 'react'

const NewStep: FC = () => {
  return (
    <Box>
      <Typography variant="h3">Insert New Node</Typography>
      <Typography mb={3}>Drag node into workflow graph</Typography>
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="space-between">
        <Node stepType={StepType.START} />
        <Node stepType={StepType.END} />
        <Node stepType={StepType.MYSQL} />
        <Node stepType={StepType.SLEEP} />
      </Box>
    </Box>
  )
}

const nodeAttributes: Record<number, { name: string; icon: ReactNode; color: string }> = {
  [StepType.START]: {
    name: 'Start',
    icon: <IconPlayerPlay />,
    color: '#474e93',
  },
  [StepType.END]: {
    name: 'End',
    icon: <IconFlag />,
    color: '#474e93',
  },
  [StepType.MYSQL]: {
    name: 'MySQL',
    icon: <IconDatabase />,
    color: '#7e5cad',
  },
  [StepType.SLEEP]: {
    name: 'Sleep',
    icon: <IconZzz />,
    color: '#7e5cad',
  },
}

const Node: FC<{ stepType: StepType }> = ({ stepType }) => {
  const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.setData('text/plain', stepType.toString())
    event.dataTransfer.effectAllowed = 'move'
  }

  const nodeAttribute = nodeAttributes[stepType]

  return (
    <Box onDragStart={onDragStart} draggable sx={{ transform: 'translate(0,0)' }}>
      <Box
        component="div"
        className={`bg-[${nodeAttribute.color}] cursor-move p-[15px] rounded-[15px] w-fit`}
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
