import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import { useWorkflow } from '../../hooks/workflow'

const Workflows: FC = () => {
  const { currentVersion } = useWorkflow()

  return (
    <Box display="flex">
      <Typography variant="h3" mb={2}>
        Version {currentVersion.toString()}
      </Typography>
    </Box>
  )
}

export default Workflows
