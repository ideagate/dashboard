import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { useWorkflows } from '../hooks/workflows'

export default function NewVersion() {
  const theme = useTheme()
  const { refetch, createVersion } = useWorkflows()
  const [isOpen, setIsOpen] = useState(false)

  const handleCreateVersion = async () => {
    await createVersion({})
    setIsOpen(false)
    refetch()
  }

  if (!isOpen) {
    return (
      <Box display={'flex'} justifyContent="space-between" mb={2}>
        <Box />
        <IconButton
          color="info"
          onClick={() => setIsOpen(true)}
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
        <Typography>Choose template</Typography>
        <Typography>From scratch</Typography>
        <Typography>From previous version</Typography>
      </Box>
      <Box>
        <IconButton color="primary" onClick={handleCreateVersion}>
          <SaveOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={() => setIsOpen(false)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
