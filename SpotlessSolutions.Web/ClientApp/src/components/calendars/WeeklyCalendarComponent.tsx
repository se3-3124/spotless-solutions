import { DateTime } from 'luxon'

import Grid from '@mui/material/Grid'

import { type BookingResponseType } from '../../types/BookingResponseType.tsx'
import { isToday } from '../../utils/date-utils.ts'

import './WeeklyCalendarComponent.style.scss'

interface WeekCalendarType {
  date: Date
  isToday: boolean
}

interface WeekCalendarComponentPropType {
  /**
   * Current active date/month
   */
  date: DateTime
  /**
   * Function to open a modal containing booking event detail
   * @param {BookingResponseType} data Booking data
   */
  handleOpen: (data: BookingResponseType) => void
  /**
   * Array of booking events for this month
   */
  events: BookingResponseType[]
}

/**
 * Weekly Calendar Component
 */
export default function WeeklyCalendarComponent ({ date, handleOpen, events }: WeekCalendarComponentPropType) {
  const makeWeekCalendar = () => {
    const calendar: WeekCalendarType[] = []

    const weekCalendar = DateTime.fromObject({
      weekYear: date.weekYear,
      weekNumber: date.weekNumber
    })

    const start = weekCalendar.startOf('week')
    for (let i = 0; i < 7; i++) {
      const current = start.plus({ days: i })
      calendar.push({
        date: current.toJSDate(),
        isToday: isToday(DateTime.now(), current)
      })
    }

    return calendar
  }

  return (
    <Grid container>
      {
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w, i) => (
          <Grid item xs={1.7} key={`wkn-${i}`}>
            <div className="weekly-calendar-week-field">
              <p>{w}</p>
            </div>
          </Grid>
        ))
      }
      {
        makeWeekCalendar().map((d, i) => (
          <Grid item xs={1.7} key={`wkc-${i}`}>
            <div className={`weekly-component${d.isToday ? ' today' : ''}`}>
              <p>{d.date.getDate()}</p>
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
