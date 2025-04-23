import { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { BaseInputProps } from './props'
import { Select } from './select'
import { TextField } from './textfield'

const BodyInputs: FC<BaseInputProps> = (props) => (
  <div className="grid grid-cols-3 gap-3">
    <TextField placeholder="placeholder textfield" {...props} />

    <Select
      placeholder="placeholder select"
      initialValue="value_3"
      options={[
        { label: 'value 1', value: 'value_1' },
        { label: 'value 2', value: 'value_2' },
        { label: 'value 3', value: 'value_3' },
      ]}
      onChange={(value) => console.log(value)}
      {...props}
    />
  </div>
)

const meta: Meta<typeof BodyInputs> = {
  title: 'components/atoms/inputs',
  component: BodyInputs,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    error: '',
  },
}
