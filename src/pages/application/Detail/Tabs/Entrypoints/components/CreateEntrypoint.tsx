import { Box, Button, TextField } from '@mui/material'
import { FC } from 'react'

import CardItem from './CardItem.styled'

const CreateEntrypoint: FC<{ onClose?: () => void }> = ({ onClose }) => {
  // TODO call api to create entrypoint
  // TODO change ideagate protobuf model become npm package instead of gitpkg, because it's hard to upgrade version

  return (
    <CardItem>
      <Box py={1} display="grid">
        <TextField autoFocus size="small" label="ID" />
        <TextField size="small" label="Method" />
        <TextField size="small" label="Path" />
        <TextField size="small" label="Name" />
        <TextField size="small" label="Description" />
        <Box>
          <Button variant="outlined">Create</Button>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </CardItem>
  )
}

export default CreateEntrypoint
