import { Workflow } from '@ideagate/model/core/endpoint/workflow'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Typography, useTheme } from '@mui/material'
import { useReducer } from 'react'

import { Select } from '#/components/atoms/input'

import { useWorkflows } from '../hooks/workflows'

type Action =
  | { action: 'open' | 'close' }
  | { action: 'change_type'; type: 'scratch' | 'from_version' }
  | { action: 'change_version'; version: bigint }

type Data = {
  isOpen: boolean
  type: 'scratch' | 'from_version'
  version: bigint | null
}

const initialData = (workflows: Workflow[]): Data => ({
  isOpen: false,
  type: 'scratch',
  version: workflows?.[0]?.version || null,
})

const reducer =
  (workflows: Workflow[]) =>
  (state: Data, action: Action): Data => {
    switch (action.action) {
      case 'open':
        return { ...initialData(workflows), isOpen: true }
      case 'close':
        return { ...state, isOpen: false }
      case 'change_type':
        return { ...state, type: action.type }
      case 'change_version':
        return { ...state, version: action.version }
      default:
        return state
    }
  }

export default function NewVersion() {
  const theme = useTheme()
  const { workflows, refetch, createVersion } = useWorkflows()

  const [data, dispatch] = useReducer(reducer(workflows), initialData(workflows))

  const handleCreateVersion = async () => {
    await createVersion({
      fromVersion: data.type === 'from_version' && data.version ? data.version : undefined, // only set if type is 'from_version' and version is exist
    })
    dispatch({ action: 'close' })
    refetch()
  }

  if (!data.isOpen) {
    return (
      <Box display={'flex'} justifyContent="space-between" mb={2}>
        <Box />
        <IconButton
          color="info"
          onClick={() => dispatch({ action: 'open' })}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          }}
        >
          <AddOutlinedIcon />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      border="solid 1px #ccc"
      borderRadius={theme.opts.borderRadius}
      px={2}
      py={1}
      mb={2}
    >
      <Box>
        <Typography variant="h4">Create New Version</Typography>
        <Box mt={1}>
          <FormControl>
            <Typography>Choose template</Typography>
            <RadioGroup
              defaultValue={data.type}
              onChange={(_, val) => dispatch({ action: 'change_type', type: val as Data['type'] })}
            >
              <FormControlLabel value="scratch" control={<Radio size="small" />} label="From scratch" />
              <Box display="grid" gridTemplateColumns="max-content auto" width={'500px'}>
                <FormControlLabel
                  value="from_version"
                  label="From previous version"
                  control={<Radio size="small" />}
                  sx={{ width: 'max-content' }}
                />
                <Select
                  fullWidth
                  disabled={data.type !== 'from_version'}
                  initialValue={data.version?.toString()}
                  onChange={(val) => dispatch({ action: 'change_version', version: BigInt(val) })}
                  options={workflows.map((workflow) => ({
                    label: `Version ${workflow.version}`,
                    value: `${workflow.version}`,
                  }))}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <IconButton color="primary" onClick={handleCreateVersion}>
          <SaveOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={() => dispatch({ action: 'close' })}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
