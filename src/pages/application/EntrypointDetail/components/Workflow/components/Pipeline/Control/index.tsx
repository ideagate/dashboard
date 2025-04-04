import { IconArrowLeft } from '@tabler/icons-react'
import { ControlButton, Controls } from '@xyflow/react'
import { FC } from 'react'

const Control: FC = () => {
  // TODO create undo function

  return (
    <Controls>
      <ControlButton onClick={() => console.log('back')}>
        <IconArrowLeft />
      </ControlButton>
    </Controls>
  )
}

export default Control
