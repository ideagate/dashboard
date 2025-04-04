import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import { mockNodes } from '../../models/mock'

const StepDetail: FC = () => {
  const [searchParams] = useSearchParams()

  const stepId = searchParams.get('step_id')

  const node = mockNodes.find((node) => node.id === stepId)

  if (node == undefined) {
    return <Box>Empty</Box>
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h3">{node.type}</Typography>
        <Typography>ID: {stepId}</Typography>
        <TextField fullWidth label="Name" />
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
