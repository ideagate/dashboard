import { Box } from '@mui/material'
import { FC } from 'react'

import { Button } from '#/components/atoms/button'

import { useWorkflow } from '../../hooks/workflow'

const WorkflowAction: FC = () => {
  const { saveWorkflow } = useWorkflow()

  return (
    <Box display={'flex'} gap={1} justifyContent={'flex-end'}>
      <Button variant="contained" onClick={saveWorkflow}>
        Save
      </Button>
      <Button variant="contained" color="success">
        Deploy
      </Button>
    </Box>
  )
}

export default WorkflowAction
