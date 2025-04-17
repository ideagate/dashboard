import { Box, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { createEntrypoint } from '#/api/grpc/entrypoint'
import { Button } from '#/components/atoms/button'

import CardItem from './CardItem.styled'

interface EntrypointCreateData {
  id: string
  method: string
  path: string
  name: string
  description: string
}

const CreateEntrypoint: FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { control, handleSubmit } = useForm<EntrypointCreateData>()

  const rmCreate = useMutation({
    mutationFn: async (data: EntrypointCreateData) => {
      createEntrypoint({
        id: data.id,
        name: data.name,
      })
    },
  })

  const handleCreate = async (data: EntrypointCreateData) => {
    console.log('data', data)
    await rmCreate.mutateAsync(data)
    if (rmCreate.isSuccess) {
      onClose?.()
    }
  }

  const isLoading = rmCreate.isPending

  return (
    <CardItem>
      <Box py={1} display="grid">
        <form onSubmit={handleSubmit(handleCreate)}>
          <Controller
            control={control}
            name="id"
            rules={{ required: 'required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                autoFocus
                size="small"
                label="ID"
                helperText={fieldState.error?.message}
                error={fieldState.invalid}
              />
            )}
          />
          <Controller
            control={control}
            name="method"
            rules={{ required: 'required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Method"
                helperText={fieldState.error?.message}
                error={fieldState.invalid}
              />
            )}
          />
          <Controller
            control={control}
            name="path"
            rules={{ required: 'required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Path"
                helperText={fieldState.error?.message}
                error={fieldState.invalid}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            rules={{ required: 'required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Name"
                helperText={fieldState.error?.message}
                error={fieldState.invalid}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => <TextField {...field} size="small" label="Description" />}
          />
          <Box>
            <Button type="submit" variant="outlined" isLoading={isLoading}>
              Create
            </Button>
            <Button variant="outlined" color="error" onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </CardItem>
  )
}

export default CreateEntrypoint
