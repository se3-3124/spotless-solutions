import type { Meta, StoryObj } from '@storybook/react'
import { DateTime } from 'luxon'

import { mockEventData } from './commons/data.ts'
import MonthCalendarComponent from '../components/calendars/MonthCalendarComponent.tsx'

const meta = {
  title: 'Monthly Calendar',
  component: MonthCalendarComponent,
  args: {
    events: mockEventData,
    handleOpen: (x) => { console.log(x) }
  },
  tags: ['autodocs']
} satisfies Meta<typeof MonthCalendarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const MonthlyCalendar: Story = {
  args: {
    date: DateTime.now()
  }
}
