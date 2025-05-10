import { Box, Grid2, Paper } from '@mui/material'
import { FC } from 'react'

import WorkflowAction from './components/Action'
import Pipeline from './components/Pipeline'
import StepDetail from './components/StepDetail'
import Workflows from './components/Workflows'
import { useWorkflow, WorkflowProvider } from './hooks/workflow'

const WorkflowTabBody: FC = () => {
  const { isLoading } = useWorkflow()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Workflows />
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <Paper variant="outlined" sx={{ padding: 0.5 }}>
            <Pipeline />
          </Paper>
        </Grid2>
        <Grid2 size={3}>
          <Paper variant="outlined" sx={{ padding: 2 }}>
            <StepDetail />
          </Paper>
        </Grid2>
      </Grid2>
      <WorkflowAction />
    </Box>
  )
}

const WorkflowTab: FC = () => (
  <WorkflowProvider>
    <WorkflowTabBody />
  </WorkflowProvider>
)

export default WorkflowTab
