import { Step } from '@ideagate/model/core/endpoint/workflow'
import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { IconX } from '@tabler/icons-react'
import { FC } from 'react'

import { TextField } from '#/components/atoms/input'

import { useWorkflow } from '../../hooks/workflow'

const StepDetailSleep: FC<{ step: Step }> = ({ step }) => {
  const { setNodeStepById, setStepInfoId } = useWorkflow()

  const handleClose = () => {
    setStepInfoId(null)
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4">Type: MySQL</Typography>
            <Typography variant="caption">ID: {step.id}</Typography>
          </Box>
          <IconButton color="error" onClick={handleClose}>
            <IconX />
          </IconButton>
        </Box>
        <Box>
          <Typography>Name</Typography>
          <TextField
            fullWidth
            initialValue={step.name || 'hupla'}
            onChange={(val) => setNodeStepById(step.id, (prevStep) => ({ ...prevStep, name: val }))}
          />
        </Box>
        <Box>
          <Typography>Duration</Typography>
          <TextField
            fullWidth
            type="number"
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
            initialValue={step.action.oneofKind === 'actionSleep' ? `${step.action.actionSleep.timeoutMs}` : ''}
            onChange={(val) =>
              setNodeStepById(step.id, (prevStep) => ({
                ...prevStep,
                action: {
                  oneofKind: 'actionSleep',
                  actionSleep: {
                    timeoutMs: BigInt(val) || 0n,
                  },
                },
              }))
            }
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default StepDetailSleep
