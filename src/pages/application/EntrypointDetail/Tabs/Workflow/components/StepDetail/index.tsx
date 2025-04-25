import { Box, InputAdornment, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TextField } from '#/components/atoms/input'

import { useWorkflow } from '../../hooks/workflow'

const StepDetail: FC = () => {
  const [searchParams] = useSearchParams()
  const { workflow } = useWorkflow()

  const stepId = searchParams.get('step_id')

  const step = workflow?.steps.find((step) => step.id === stepId)
  if (step == undefined) {
    return <Box>Empty</Box>
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h3">{step?.name}</Typography>
        <Typography>ID: {stepId}</Typography>
        <TextField fullWidth label="Name" value={step.name || ''} />
        <TextField
          fullWidth
          type="number"
          label="Sleep Duration"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">ms</InputAdornment>,
            },
          }}
          onWheel={(event) => {
            // `event.currentTarget` is a callable type but is targetting the MUI element
            // whereas `event.target` targets the input element but does not have the callable type, so casting
            ;(event.target as HTMLInputElement).blur()
          }}
        />
      </Stack>
    </Box>
  )
}

export default StepDetail
