import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { FC } from 'react'

import NewVersion from './components/NewVersion'
import { useWorkflows, WorkflowsProvider } from './hooks/workflows'

const VersionTabBody: FC = () => {
  const theme = useTheme()
  const { workflows, refetch, deleteVersion, changeVersion } = useWorkflows()

  const handleDeleteVersion = async (version: bigint) => {
    await deleteVersion(version)
    refetch()
  }

  return (
    <Box>
      <NewVersion />

      <Box borderRadius={theme.opts.borderRadius} border={'solid 1px #ccc'}>
        {workflows.map((workflow, idx) => (
          <Box
            key={workflow.version}
            display="flex"
            justifyContent="space-between"
            borderTop={idx !== 0 ? 'solid 1px #ccc' : 'none'}
            px={2}
            py={1}
          >
            <Box>
              <Typography variant="h4">Version {workflow.version.toString()}</Typography>
              <Typography variant="caption">
                <span>Created at {moment.unix(Number(workflow.createdAt?.seconds)).startOf('seconds').fromNow()} </span>
                {workflow.createdAt?.seconds !== workflow.updatedAt?.seconds && (
                  <span>
                    and last updated at {moment.unix(Number(workflow.updatedAt?.seconds)).startOf('seconds').fromNow()}
                  </span>
                )}
              </Typography>
            </Box>
            <Box>
              <IconButton color="info">
                <VisibilityOutlinedIcon onClick={() => changeVersion(workflow.version)} />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteVersion(workflow.version)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function VersionTab() {
  return (
    <WorkflowsProvider>
      <VersionTabBody />
    </WorkflowsProvider>
  )
}
