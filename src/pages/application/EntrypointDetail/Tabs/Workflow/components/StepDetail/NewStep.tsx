import { StepType } from '@ideagate/model/core/endpoint/workflow'
import { Box } from '@mui/material'
import { IconDatabase, IconZzz } from '@tabler/icons-react'
import { DragEventHandler, FC } from 'react'

const NewStep: FC = () => {
  const onDragStart =
    (stepType: StepType): DragEventHandler<HTMLDivElement> =>
    (event) => {
      event.dataTransfer.setData('text/plain', stepType.toString())
      event.dataTransfer.effectAllowed = 'move'
    }

  return (
    <Box>
      <Box
        component="div"
        className="bg-[#7e5cad] p-[15px] rounded-[15px] w-fit"
        sx={{ color: 'white' }}
        onDragStart={onDragStart(StepType.MYSQL)}
        draggable
      >
        <IconDatabase />
      </Box>
      <Box
        component="div"
        className="bg-[#7e5cad] p-[15px] rounded-[15px] w-fit"
        sx={{ color: 'white' }}
        onDragStart={onDragStart(StepType.SLEEP)}
        draggable
      >
        <IconZzz />
      </Box>
    </Box>
  )
}

export default NewStep
