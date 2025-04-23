import { DevTool } from '@hookform/devtools'
import { EndpointType } from '@ideagate/model/core/endpoint/endpoint'
import { Box, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { createEntrypoint } from '#/api/grpc/entrypoint'
import { Button } from '#/components/atoms/button'
import { Select, TextField } from '#/components/atoms/input'

import CardItem from './CardItem.styled'

interface EntrypointCreateData {
  id: string
  method: string
  path: string
  name: string
  description: string
}

const CreateEntrypoint: FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { project_id, app_id } = useParams()

  const { control, handleSubmit } = useForm<EntrypointCreateData>()

  const rmCreate = useMutation({
    mutationFn: async (data: EntrypointCreateData) => {
      createEntrypoint({
        projectId: project_id,
        applicationId: app_id,
        id: data.id,
        name: data.name,
        description: data.description,
        type: EndpointType.REST,
        settings: {
          oneofKind: 'settingRest',
          settingRest: {
            method: data.method,
            path: data.path,
          },
        },
      })
    },
  })

  const handleCreate = async (data: EntrypointCreateData) => {
    await rmCreate.mutateAsync(data)
    onClose?.()
  }

  const isLoading = rmCreate.isPending

  return (
    <>
      <DevTool control={control} />

      <CardItem>
        <Typography variant="h3">Create Endpoint</Typography>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Box display="grid" gridTemplateColumns="200px auto" gap={1} alignItems="center">
            <Typography>Entrypoint ID</Typography>
            <Controller
              control={control}
              name="id"
              rules={{
                required: 'Entrypoint id is required',
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: 'ID must contain only letters, numbers, underscores, or hyphens',
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  autoFocus
                  error={fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  placeholder="eg: example-entrypoint-id"
                />
              )}
            />

            <Typography>Method</Typography>
            <Controller
              control={control}
              name="method"
              rules={{ required: 'Method is required' }}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  error={fieldState.error?.message}
                  options={[
                    { label: 'GET', value: 'GET' },
                    { label: 'POST', value: 'POST' },
                    { label: 'PUT', value: 'PUT' },
                    { label: 'PATCH', value: 'PATCH' },
                    { label: 'DELETE', value: 'DELETE' },
                  ]}
                />
              )}
            />

            <Typography>Path</Typography>
            <Controller
              control={control}
              name="path"
              rules={{
                required: 'Path is required',
                pattern: {
                  value: /^\/[a-zA-Z0-9/_-]*$/,
                  message:
                    'Path must start with a "/" and contain only letters, numbers, underscores, hyphens, or slashes',
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  placeholder="eg: /data/profile"
                />
              )}
            />

            <Typography>Name</Typography>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Name is required' }}
              render={({ field, fieldState }) => (
                <TextField {...field} error={fieldState.error?.message} placeholder="eg: Get Profile Data" />
              )}
            />

            <Typography>Description</Typography>
            <Controller
              control={control}
              name="description"
              render={({ field }) => <TextField {...field} size="small" placeholder="eg: Used to get data profile" />}
            />

            <Box>
              <Button type="submit" variant="outlined" isLoading={isLoading}>
                Create
              </Button>
              <Button variant="outlined" color="error" onClick={onClose} isLoading={isLoading}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </CardItem>
    </>
  )
}

export default CreateEntrypoint
