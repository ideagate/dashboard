import { Variable, VariableType } from '@ideagate/model/core/endpoint/variable'
import { Query, Step } from '@ideagate/model/core/endpoint/workflow'
import Editor from '@monaco-editor/react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { IconX } from '@tabler/icons-react'
import { set } from 'lodash'
import { FC, useMemo } from 'react'

import { Button } from '#/components/atoms/button'
import { TextField } from '#/components/atoms/input'

import { useWorkflow } from '../../hooks/workflow'

const StepDetailMysql: FC<{ step: Step }> = ({ step }) => {
  const { setNodeStepById, setStepInfoId } = useWorkflow()

  const handleClose = () => {
    setStepInfoId(null)
  }

  const actionMysql = step.action.oneofKind === 'actionMysql' ? step.action.actionMysql : null

  const queries: QueryWithId[] = useMemo(() => {
    const queries = (actionMysql?.queries || []) as QueryWithId[]

    return (
      queries.map((query) => {
        if (query.id == null) {
          query.id = crypto.randomUUID()
        }
        return query as QueryWithId
      }) || []
    )
  }, [actionMysql?.queries])

  return (
    <Box>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4">Type: MySQL</Typography>
            <Typography variant="caption">ID: {step.id}</Typography>
          </Box>
          <IconButton color="error" onClick={handleClose}>
            <IconX />
          </IconButton>
        </Box>
        <Box>
          <Typography mb={0.5} variant="h5">
            Name
          </Typography>
          <TextField
            fullWidth
            initialValue={step.name || 'hupla'}
            onChange={(val) => setNodeStepById(step.id, (prevStep) => ({ ...prevStep, name: val }))}
          />
        </Box>
        <Box>
          <Typography mb={0.5} variant="h5">
            Data Source ID
          </Typography>
          <TextField
            fullWidth
            initialValue={actionMysql?.dataSourceId || ''}
            onChange={(val) => setNodeStepById(step.id, changeStep({ action: 'dataSourceId', payload: val }))}
          />
        </Box>
        <Box>
          <Typography mb={0.5} variant="h5">
            Queries
          </Typography>
          <Stack spacing={1}>
            {queries.map((query, index) => (
              <Box key={query.id}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Query - {index + 1}</Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setNodeStepById(step.id, changeStep({ action: 'queryRemove', payload: index }))}
                  >
                    <IconX size="20px" />
                  </IconButton>
                </Box>
                <Editor
                  height={'100px'}
                  theme="vs-dark"
                  defaultLanguage="sql"
                  defaultValue={query.query?.value}
                  onChange={(val) =>
                    setNodeStepById(
                      step.id,
                      changeStep({ action: 'queryEdit', payload: { query: val || '', index: index } })
                    )
                  }
                />
              </Box>
            ))}
          </Stack>
          <Button
            fullWidth
            variant="outlined"
            className="mt-2"
            size="small"
            onClick={() => setNodeStepById(step.id, changeStep({ action: 'queryAdd' }))}
          >
            Add
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

type QueryWithId = Query & { id: string }

type ChangeStepMysqlArgs =
  | { action: 'dataSourceId'; payload: string }
  | { action: 'queryAdd' }
  | { action: 'queryRemove'; payload: number }
  | { action: 'queryEdit'; payload: { index: number; query: string } }

export const changeStep =
  (arg: ChangeStepMysqlArgs) =>
  (prev: Step): Step => {
    const prevActionMysql = prev.action.oneofKind === 'actionMysql' ? prev.action.actionMysql : null

    switch (arg.action) {
      case 'dataSourceId':
        return {
          ...prev,
          action: {
            oneofKind: 'actionMysql',
            actionMysql: { ...prevActionMysql, dataSourceId: arg.payload },
          },
        } as Step

      case 'queryAdd': {
        let queries = prevActionMysql?.queries ?? []
        queries = [...queries, Query.create({})]

        return {
          ...prev,
          action: {
            oneofKind: 'actionMysql',
            actionMysql: { ...prevActionMysql, queries: queries },
          },
        } as Step
      }

      case 'queryRemove': {
        let queries = prevActionMysql?.queries ? [...prevActionMysql.queries] : []
        queries = queries.filter((_, i) => i !== arg.payload)

        return {
          ...prev,
          action: {
            oneofKind: 'actionMysql',
            actionMysql: { ...prevActionMysql, queries: queries },
          },
        } as Step
      }

      case 'queryEdit': {
        let queries = prevActionMysql?.queries ?? []
        queries = set(
          queries,
          [arg.payload.index],
          Query.create({
            query: Variable.create({
              type: VariableType.STRING,
              value: arg.payload.query,
            }),
          })
        )

        return {
          ...prev,
          action: {
            oneofKind: 'actionMysql',
            actionMysql: { ...prevActionMysql, queries: queries },
          },
        } as Step
      }
    }

    return prev
  }

export default StepDetailMysql
