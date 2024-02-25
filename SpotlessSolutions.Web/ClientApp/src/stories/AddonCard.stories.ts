import type { Meta, StoryObj } from '@storybook/react'

import AddOnServicesCard from '../components/cards/AddOnServicesCard.tsx'

const meta = {
  title: 'AddOn Services Card Component',
  component: AddOnServicesCard,
  tags: ['autodocs']
} satisfies Meta<typeof AddOnServicesCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Sample',
    description: 'Some long description goes here'
  }
}
