import type { Meta, StoryObj } from '@storybook/react'

import BookingsDetailModal from '../pages/dashboard/components/modals/BookingDetailModal.tsx'

import { mockEventData } from './commons/data.ts'

const meta = {
  title: 'Booking Details Modal',
  component: BookingsDetailModal,
  tags: ['autodocs']
} satisfies Meta<typeof BookingsDetailModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockEventData[0]
  }
}
