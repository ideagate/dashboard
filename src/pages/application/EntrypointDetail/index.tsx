import AccountTreeIcon from '@mui/icons-material/AccountTree'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tab,
  TabProps,
  Tabs,
  TabsProps,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { getListApps } from '#/api/grpc/application'
import { getEntrypoints } from '#/api/grpc/entrypoint'

import Workflow from './Tabs/Workflow'

const EntrypointDetail: FC = () => {
  const { project_id, app_id, entrypoint_id } = useParams()

  const linkApplications = `/${project_id}/application`
  const linkApplication = `/${project_id}/application/${app_id}`

  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'workflow'

  const rqApplication = useQuery({
    queryKey: ['application', project_id, app_id],
    queryFn: () => getListApps({ projectId: project_id, applicationId: app_id }),
  })
  const application = rqApplication.data?.applications[0]

  const rqEntrypoint = useQuery({
    queryKey: ['entrypoint', project_id, app_id, entrypoint_id],
    queryFn: () => getEntrypoints({ projectId: project_id, applicationId: app_id, endpointId: entrypoint_id }),
  })
  const entrypoint = rqEntrypoint.data?.endpoints[0]

  const onChangeTab: TabsProps['onChange'] = (_, tab) => {
    setSearchParams({ tab }, { replace: true })
  }

  const Body = () => {
    switch (tab) {
      case 'setting':
        return <div>Settings</div>
      default:
        return <Workflow />
    }
  }

  return (
    <>
      <Card
        sx={{
          p: 1.5,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link to={linkApplication}>
            <IconButton size="small">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography variant="h4">{entrypoint?.name}</Typography>
        </Box>

        <Breadcrumbs separator=">" aria-label="breadcrumb">
          [
          <Link to={linkApplications}>
            <Typography>Applications</Typography>
          </Link>
          ,
          <Link to={linkApplication}>
            <Typography>{application?.name}</Typography>
          </Link>
          ,<Typography>{entrypoint_id}</Typography>]
        </Breadcrumbs>
      </Card>

      <Card>
        <CardContent>
          <Tabs value={tab} onChange={onChangeTab} sx={{ minHeight: 0 }}>
            <TabCustom value={'workflow'} icon={<AccountTreeIcon />} iconPosition="start" label="Workflow" />
            <TabCustom value={'setting'} icon={<SettingsIcon />} iconPosition="start" label="Settings" />
          </Tabs>
          <Divider sx={{ marginBottom: 2 }} />

          {Body()}
        </CardContent>
      </Card>
    </>
  )
}

const TabCustom = (props: TabProps) => <Tab {...props} sx={{ ...props.sx, minHeight: 0 }} />

export default EntrypointDetail
