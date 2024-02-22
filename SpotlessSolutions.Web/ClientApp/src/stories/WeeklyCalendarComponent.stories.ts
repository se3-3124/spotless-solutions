import type { Meta, StoryObj } from '@storybook/react'
import { DateTime } from 'luxon'

import { mockEventData } from './commons/data.ts'
import WeeklyCalendarComponent from '../components/calendars/WeeklyCalendarComponent.tsx'

const meta = {
  title: 'Weekly Calendar',
  component: WeeklyCalendarComponent,
  args: {
    events: mockEventData,
    handleOpen: (x) => { console.log(x) }
  },
  tags: ['autodocs']
} satisfies Meta<typeof WeeklyCalendarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const WeeklyCalendar: Story = {
  args: {
    date: DateTime.now()
  }
}
