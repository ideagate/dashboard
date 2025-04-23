import AddIcon from '@mui/icons-material/Add'
import { Box, IconButton, TextField, useTheme } from '@mui/material'
import { FC, useState } from 'react'

import CreateEntrypoint from './components/CreateEntrypoint'
import EntrypointItem from './components/EntrypointItem'
import useEntrypoints from './hooks/entrypoints'

const EntrypointPage: FC = () => {
  const theme = useTheme()

  const [isCreateMode, setIsCreateMode] = useState(false)

  const { entrypoints, refetchEntrypoints, searchEntrypoints } = useEntrypoints()

  const handleCloseCreate = () => {
    setIsCreateMode(false)
    refetchEntrypoints()
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search entrypoints"
          onChange={(e) => searchEntrypoints(e.target.value)}
        />
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            ':hover': { color: theme.palette.primary.main },
          }}
          onClick={() => setIsCreateMode((prev) => !prev)}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {isCreateMode && <CreateEntrypoint onClose={handleCloseCreate} />}
      {entrypoints.map((entrypoint) => (
        <EntrypointItem key={entrypoint.id} entrypoint={entrypoint} />
      ))}
    </Box>
  )
}

export default EntrypointPage
