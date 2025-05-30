import { Variable, VariableType } from '@ideagate/model/core/endpoint/variable'
import { ActionMysql, Query, Step } from '@ideagate/model/core/endpoint/workflow'
import { describe, expect, it } from 'vitest'

import { changeStep } from './StepDetailMysql'

function createStepMysql(overrides: Partial<ActionMysql> = {}): Step {
  return {
    id: 'step-1',
    name: 'Test Step',
    action: {
      oneofKind: 'actionMysql',
      actionMysql: {
        dataSourceId: 'ds-1',
        queries: [
          Query.create({
            query: Variable.create({
              type: VariableType.STRING,
              value: 'SELECT 1',
            }),
          }),
        ],
        ...overrides,
      },
    },
  } as Step
}

describe('changeStep', () => {
  it('should update dataSourceId', () => {
    const prev = createStepMysql()
    const next = changeStep({ action: 'dataSourceId', payload: 'ds-2' })(prev)
    if (next.action.oneofKind !== 'actionMysql') {
      throw new Error('Expected actionMysql kind')
    }

    expect(next.action.oneofKind).toBe('actionMysql')
    expect(next.action.actionMysql?.dataSourceId).toBe('ds-2')
  })

  it('should add a new query', () => {
    const prev = createStepMysql()
    const next = changeStep({ action: 'queryAdd' })(prev)
    if (next.action.oneofKind !== 'actionMysql') {
      throw new Error('Expected actionMysql kind')
    }

    expect(next.action.actionMysql?.queries.length).toBe(2)
    expect(next.action.actionMysql?.queries[1]).toBeDefined()
  })

  it('should remove a query by index', () => {
    const prev = createStepMysql({
      queries: [
        Query.create({ query: Variable.create({ type: VariableType.STRING, value: 'SELECT 1' }) }),
        Query.create({ query: Variable.create({ type: VariableType.STRING, value: 'SELECT 2' }) }),
        Query.create({ query: Variable.create({ type: VariableType.STRING, value: 'SELECT 3' }) }),
      ],
    })

    const next = changeStep({ action: 'queryRemove', payload: 1 })(prev)
    if (next.action.oneofKind !== 'actionMysql') {
      throw new Error('Expected actionMysql kind')
    }

    expect(next.action.actionMysql?.queries.length).toBe(2)
    expect(next.action.actionMysql?.queries[0].query?.value).toBe('SELECT 1')
    expect(next.action.actionMysql?.queries[1].query?.value).toBe('SELECT 3')
  })

  it('should edit a query by index', () => {
    const prev = createStepMysql()
    const next = changeStep({
      action: 'queryEdit',
      payload: { index: 0, query: 'SELECT 42' },
    })(prev)
    if (next.action.oneofKind !== 'actionMysql') {
      throw new Error('Expected actionMysql kind')
    }

    expect(next.action.actionMysql?.queries[0].query?.value).toBe('SELECT 42')
    expect(next.action.actionMysql?.queries[0].query?.type).toBe(VariableType.STRING)
  })

  it('should handle missing queries gracefully', () => {
    const prev = createStepMysql({ queries: undefined })
    const next = changeStep({ action: 'queryAdd' })(prev)
    if (next.action.oneofKind !== 'actionMysql') {
      throw new Error('Expected actionMysql kind')
    }

    expect(next.action.actionMysql?.queries.length).toBe(1)
  })
})
