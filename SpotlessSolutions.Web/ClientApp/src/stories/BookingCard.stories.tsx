import type { Meta, StoryObj } from '@storybook/react'

import BookingCard from '../components/cards/BookingCard.tsx'
import { mockEventData } from './commons/data.ts'
import { BookingStatus } from '../types/BookingResponseType.tsx'

const meta = {
  title: 'Booking card component',
  component: BookingCard,
  args: {
    handleClick: (_) => { }
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '180px' }}>
          <Story />
        </div>
      )
    }
  ],
  tags: ['autodocs']
} satisfies Meta<typeof BookingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Accepted: Story = {
  args: {
    booking: {
      ...mockEventData[0],
      status: BookingStatus.Approved
    }
  }
}

export const Denied: Story = {
  args: {
    booking: {
      ...mockEventData[0],
      status: BookingStatus.Rejected
    }
  }
}

export const Pending: Story = {
  args: {
    booking: {
      ...mockEventData[0],
      status: BookingStatus.Pending
    }
  }
}

export const Done: Story = {
  args: {
    booking: {
      ...mockEventData[0],
      status: BookingStatus.Completed
    }
  }
}
