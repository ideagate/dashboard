import { StepType, Workflow } from '@ideagate/model/core/endpoint/workflow'
import { PartialDeep } from 'type-fest'

export const mockWorkflow: PartialDeep<Workflow, { recurseIntoArrays: true }> = {
  projectId: 'test-project',
  applicationId: 'test-application',
  entrypointId: 'admin-list',
  version: 1n,
  steps: [
    {
      id: '1',
      type: StepType.START,
      name: 'Start',
      graph: {
        positionX: 0,
        positionY: 0,
      },
    },
    {
      id: '2',
      type: StepType.SLEEP,
      name: 'Sleep 1',
      graph: {
        positionX: 150,
        positionY: 0,
      },
    },
    {
      id: '3',
      type: StepType.SLEEP,
      name: 'Sleep 2',
      graph: {
        positionX: 300,
        positionY: 0,
      },
    },
    {
      id: '4',
      type: StepType.SLEEP,
      name: 'Sleep 3',
      graph: {
        positionX: 230,
        positionY: 100,
      },
    },
    {
      id: '5',
      type: StepType.END,
      name: 'End',
      graph: {
        positionX: 450,
        positionY: 0,
      },
    },
  ],
  edges: [
    {
      id: 'e1-2',
      source: '1',
      dest: '2',
    },
  ],
}
