import { Box, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { FC } from 'react'

import { useWorkflow } from '../../hooks/workflow'

const Workflows: FC = () => {
  const { workflows } = useWorkflow()
  const theme = useTheme()

  return (
    <Box display="flex">
      {workflows.map((workflow) => (
        <Box key={workflow.version} border="solid 1px #ccc" borderRadius={theme.opts.borderRadius} px={2} py={1} mb={2}>
          <Typography>Version {workflow.version.toString()}</Typography>
          <Typography variant="caption">
            {moment.unix(Number(workflow.updatedAt?.seconds)).startOf('hours').fromNow()}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Workflows
