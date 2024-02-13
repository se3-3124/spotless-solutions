import { DateTime } from 'luxon'

import Grid from '@mui/material/Grid'

import { type BookingResponseType } from '../../types/BookingResponseType.tsx'
import { isToday } from '../../utils/date-utils.ts'

import './MonthCalendarComponent.style.scss'

interface CalendarObject {
  date: Date
  isToday: boolean
  inactive: boolean
}

interface CalendarComponentProps {
  /**
   * Current active date/month
   */
  date: DateTime
  /**
   * Array of booking events for this month
   */
  events: BookingResponseType[]
  /**
   * Function to open a modal containing booking event detail
   * @param {BookingResponseType} data Booking data
   */
  handleOpen: (data: BookingResponseType) => void
}

/**
 * Monthly Calendar Component
 */
export default function MonthCalendarComponent ({ date, handleOpen, events }: CalendarComponentProps) {
  const getFirstDayOfMonth = () => {
    return date.startOf('month').weekday
  }

  const getPreviousMonthDates = () => {
    const data: CalendarObject[] = []

    const previousMonth = date.minus({ months: 1 })
      .endOf('month')

    for (let i = getFirstDayOfMonth(); i >= 1; i--) {
      const current = previousMonth.minus({ days: i })
      data.push({
        date: current.toJSDate(),
        isToday: isToday(DateTime.now(), current),
        inactive: true
      })
    }

    return data
  }

  const getCurrentMonthDates = () => {
    const data: CalendarObject[] = []

    const lastDayOfMonth = date.daysInMonth ?? 0

    for (let i = 0; i < lastDayOfMonth; i++) {
      const current = date.startOf('month').plus({ days: i })
      data.push({
        date: current.toJSDate(),
        isToday: isToday(DateTime.now(), current),
        inactive: false
      })
    }

    return data
  }

  const getFirstDatesNextMonth = () => {
    const data: CalendarObject[] = []

    const lastDayOfMonth = date.endOf('month')

    for (let i = 0; i <= (7 - lastDayOfMonth.weekday); i++) {
      const current = lastDayOfMonth.plus({ days: i + 1 })
      data.push({
        date: current.toJSDate(),
        isToday: isToday(DateTime.now(), current),
        inactive: true
      })
    }

    return data
  }

  return (
    <Grid container spacing={0}>
      {
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w, i) => (
          <Grid item xs={1.7} key={`wkn-${i}`}>
            <div className="calendar-week-field">
              <p>{w}</p>
            </div>
          </Grid>
        ))
      }
      {
        [...getPreviousMonthDates(), ...getCurrentMonthDates(), ...getFirstDatesNextMonth()].map((d, i) => (
          <Grid item xs={1.7} key={`p-${i}`}>
            <div className={`calendar-item${d.isToday ? ' today' : ''}`}>
              <p className={d.inactive ? 'inactive' : ''}>{d.date.getDate()}</p>
              {
                events.filter(x => {
                  const issued = new Date(x.issuedDate)
                  return issued.getFullYear() === d.date.getFullYear() &&
                    issued.getMonth() === d.date.getMonth() &&
                    issued.getDate() === d.date.getDate()
                }).map((x, ii) => (
                  <div key={`d-${ii}`} onClick={() => {
                    handleOpen(x)
                  }}>
                    {x.servicesBooked[0].name}
                  </div>
                ))
              }
            </div>
          </Grid>
        ))
      }
    </Grid>
  )
}
