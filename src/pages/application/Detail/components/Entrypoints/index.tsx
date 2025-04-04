import { Endpoint } from '@bayu-aditya/ideagate-model-js/core/endpoint/endpoint'
import { Box, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

const EntrypointPage: FC = () => {
  const { project_id, app_id } = useParams()
  const theme = useTheme()
  const entrypoints = mockEntrypoints

  return (
    <div>
      {entrypoints.map((entrypoint) => (
        <Link key={entrypoint.id} to={`/${project_id}/application/${app_id}/entrypoint/${entrypoint.id}`}>
          <Box
            sx={{
              my: 1,
              border: 'solid 1px',
              borderColor: 'divider',
              borderRadius: theme.opts.borderRadius,
              padding: 1,
            }}
          >
            <Typography>
              {entrypoint.method} {entrypoint.path}
            </Typography>
            <Typography variant="subtitle2">{entrypoint.setting?.name}</Typography>
          </Box>
        </Link>
      ))}
    </div>
  )
}

export default EntrypointPage

const mockEntrypoints: Endpoint[] = [
  {
    id: 'healthcheck',
    setting: {
      name: 'Healthcheck',
      description: 'Description of Healthcheck',
      timeoutMs: 0n,
      numWorkers: 0,
    },
    projectId: 'test',
    method: 'GET',
    path: '/health',
  },
  {
    id: 'get-user',
    setting: {
      name: 'Get User',
      description: 'Description of Get User',
      timeoutMs: 0n,
      numWorkers: 0,
    },
    projectId: 'test',
    method: 'GET',
    path: '/user',
  },
]
