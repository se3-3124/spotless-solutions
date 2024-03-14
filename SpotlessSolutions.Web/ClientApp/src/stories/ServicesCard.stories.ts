import type { Meta, StoryObj } from '@storybook/react'

import CardServices from '../components/cards/CardServices.tsx'
import tdLogo from '../assets/td_logo.jpg'

const meta = {
  title: 'Services Card Component',
  component: CardServices,
  tags: ['autodocs']
} satisfies Meta<typeof CardServices>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Sample',
    description: 'Some long description goes here',
    image: tdLogo
  }
}
