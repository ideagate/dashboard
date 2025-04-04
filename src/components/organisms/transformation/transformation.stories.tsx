import { Meta, StoryObj } from '@storybook/react'

import Transformation from './transformation'

const meta: Meta<typeof Transformation> = {
  title: 'components/organisms/transformation',
  component: Transformation,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithData: Story = {
  args: {
    defaultData: {
      vars: [
        {
          name: 'variable_1',
          type: 'string',
          required: true,
          value: 'value_1',
          default: 'default_1',
        },
        {
          name: 'variable_2',
          type: 'string',
          required: true,
          value: 'value_2',
          default: 'default_2',
        },
        {
          name: 'variable_3',
          type: 'string',
          required: true,
          value: 'value_3',
          default: 'default_3',
        },
      ],
      outputs: [
        {
          name: 'output_1',
          type: 'string',
          required: true,
          value: 'value_1',
          default: 'default_1',
        },
        {
          name: 'output_2',
          type: 'string',
          required: true,
          value: 'value_2',
          default: 'default_2',
        },
        {
          name: 'output_3',
          type: 'string',
          required: true,
          value: 'value_3',
          default: 'default_3',
        },
      ],
    },
  },
}
