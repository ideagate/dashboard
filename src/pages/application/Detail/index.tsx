import ApiIcon from '@mui/icons-material/Api'
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
import { FC } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { Entrypoints, Setting } from './components'
import { ApplicationProvider, useApplication } from './hooks/application'

const ApplicationPage: FC = () => {
  const { project_id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'entrypoint'

  const { app, isLoading } = useApplication()

  const onChangeTab: TabsProps['onChange'] = (_, tab) => {
    setSearchParams({ tab }, { replace: true })
  }

  const Body = () => {
    switch (tab) {
      case 'setting':
        return <Setting />
      default:
        return <Entrypoints />
    }
  }

  const linkApplications = `/${project_id}/application`

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Card sx={{ p: 1.5, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link to={linkApplications}>
            <IconButton size="small">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography variant="h4">{app?.name}</Typography>
        </Box>

        <Breadcrumbs separator=">" aria-label="breadcrumb">
          [
          <Link to={linkApplications}>
            <Typography>Applications</Typography>
          </Link>
          ,<Typography>{app?.name}</Typography>]
        </Breadcrumbs>
      </Card>

      <Card sx={{ minHeight: '100%' }}>
        <CardContent>
          <Tabs value={tab} onChange={onChangeTab} sx={{ minHeight: 0 }}>
            <TabCustom value={'entrypoint'} icon={<ApiIcon />} iconPosition="start" label="Entrypoints" />
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

export default function Page() {
  return (
    <ApplicationProvider>
      <ApplicationPage />
    </ApplicationProvider>
  )
}
