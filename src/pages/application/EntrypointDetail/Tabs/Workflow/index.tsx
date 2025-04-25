import { Grid2, Paper } from '@mui/material'
import { FC } from 'react'

import WorkflowAction from './components/Action'
import Pipeline from './components/Pipeline'
import StepDetail from './components/StepDetail'
import { WorkflowProvider } from './hooks/workflow'

const WorkflowTab: FC = () => {
  return (
    <WorkflowProvider>
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
    </WorkflowProvider>
  )
}

export default WorkflowTab
