import { Meta, StoryObj } from '@storybook/react'

import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'components/atoms/button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'hupla',
    variant: 'contained',
  },
}
