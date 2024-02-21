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

  const createTimeFrameList = () => {
    const time = DateTime.fromObject({
      year: 2024,
      month: 1,
      day: 1
    })

    const times: Array<{ time: string, object: { hour: number, minute: number } }> = []
    for (let i = 0; i < 24; i++) {
      const active = time.plus({ hours: i })
      times.push({
        time: active.toFormat('hh\':\'mm a'),
        object: {
          hour: active.hour,
          minute: active.minute
        }
      })
    }

    return times
  }

  return (
    <Grid container>
      <Grid item xs={1.5} />
      {
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w, i) => (
          <Grid item xs={1.5} key={`wkn-${i}`}>
            <div className="weekly-calendar-week-field">
              <p>{w}</p>
            </div>
          </Grid>
        ))
      }
      {
        createTimeFrameList().map((xx, ii) => (
          <Grid container key={ii}>
            <Grid item xs={1.5}>
              <div className="weekly-component-timeframe">
                <p className="time">
                  {xx.time}
                </p>
              </div>
            </Grid>
            {
              makeWeekCalendar().map((d, i) => (
                <Grid item xs={1.5} key={`wkc-${i}`}>
                  <div className={`weekly-component${d.isToday ? ' today' : ''}`}>
                    {
                      ii === 0 && (<p>{d.date.getDate()}</p>)
                    }
                    {
                      events.filter(x => {
                        const issued = new Date(x.schedule)
                        return issued.getFullYear() === d.date.getFullYear() &&
                          issued.getMonth() === d.date.getMonth() &&
                          issued.getDate() === d.date.getDate() &&
                          issued.getHours() === xx.object.hour
                      }).map((x, ii) => (
                        <div key={`d-${ii}`} onClick={() => {
                          handleOpen(x)
                        }}>
                          {x.mainService.service.name}
                        </div>
                      ))
                    }
                  </div>
                </Grid>
              ))
            }
          </Grid>
        ))
      }
    </Grid>
  )
}
