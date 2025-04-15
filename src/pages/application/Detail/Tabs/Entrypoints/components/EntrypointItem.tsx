import { Endpoint } from '@ideagate/model/core/endpoint/endpoint'
import { Box, Chip, Typography } from '@mui/material'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import CardItem from './CardItem.styled'

const EntrypointItem: FC<{ entrypoint: Endpoint }> = ({ entrypoint }) => {
  const { project_id, app_id } = useParams()

  const setting = entrypoint.settings
  const settingRest = (setting.oneofKind === 'settingRest' && setting.settingRest) || null

  return (
    <Link key={entrypoint.id} to={`/${project_id}/application/${app_id}/entrypoint/${entrypoint.id}`}>
      <CardItem>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            size="small"
            color={colorChipMethod(settingRest?.method)}
            label={settingRest?.method}
            sx={{ width: 75 }}
          />
          <Typography>{settingRest?.path}</Typography>
        </Box>
        <Typography variant="subtitle2">{entrypoint.name}</Typography>
      </CardItem>
    </Link>
  )
}

function colorChipMethod(method: string | undefined) {
  switch (method) {
    case 'GET':
      return 'success'
    case 'POST':
      return 'info'
    case 'PUT':
      return 'warning'
    case 'DELETE':
      return 'error'
    default:
      return 'default'
  }
}

export default EntrypointItem
