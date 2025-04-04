import { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'
import { TextField } from './textfield'

const meta: Meta = {
  title: 'components/atoms/input',
  component: TextField,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex gap-3">
      <TextField />

      <Select
        options={[
          { label: 'value 1', value: 'value_1' },
          { label: 'value 2', value: 'value_2' },
          { label: 'value 3', value: 'value_3' },
        ]}
      />
    </div>
  ),
}
