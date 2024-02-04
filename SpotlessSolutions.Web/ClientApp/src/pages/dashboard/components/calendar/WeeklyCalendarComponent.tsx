import { useContext, useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import AuthContext from '../../../../contexts/AuthContext.ts'
import CalendarContext from '../../../../contexts/CalendarContext.ts'
import { type BookingResponseType } from '../../../../types/BookingResponseType.tsx'

import './WeeklyCalendarComponent.style.scss'

interface WeekCalendarType {
  date: Date
  isToday: boolean
}

interface CalendarComponentPropType {
  handleOpen: (data: BookingResponseType) => void
}

export default function WeeklyCalendarComponent (prop: CalendarComponentPropType) {
  const [events, setEvents] = useState<BookingResponseType[]>([])
  const { active } = useContext(CalendarContext)
  const { request } = useContext(AuthContext)

  useEffect(() => {
    async function retrieveEventsOnMonth () {
      if (request == null) {
        return
      }

      const activeCalendar = makeWeekCalendar()
      const start = activeCalendar[0].date
      const end = activeCalendar[activeCalendar.length - 1].date

      const data = await request
        .get<{ success: boolean, result: BookingResponseType[] }>(`/api/bookings/admin/range?start=${start.toISOString()}&end=${end.toISOString()}`)
      setEvents(data.data.result)
    }

    retrieveEventsOnMonth().catch(console.error)
  }, [active])

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return today.getDate() === date.getDate() &&
            today.getMonth() === date.getMonth() &&
            today.getFullYear() === date.getFullYear()
  }

  const makeWeekCalendar = (): WeekCalendarType[] => {
    const calendar: WeekCalendarType[] = []

    const currentDay = active.getDay()

    for (let i = currentDay; i > 0; i--) {
      const current = new Date(active.getFullYear(), active.getMonth(), active.getDate() - 1)
      calendar.push({
        date: current,
        isToday: isToday(current)
      })
    }

    calendar.push({
      date: active,
      isToday: isToday(active)
    })

    for (let i = (currentDay + 1); i < 7; i++) {
      const current = new Date(active.getFullYear(), active.getMonth(), active.getDate() + i)
      calendar.push({
        date: current,
        isToday: isToday(current)
      })
    }

    return calendar
  }

  return (
        <Grid container>
            {
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w, i) => (
                    <Grid xs={1.7} key={`wkn-${i}`}>
                        <div className="weekly-calendar-week-field">
                            <p>{w}</p>
                        </div>
                    </Grid>
                ))
            }
            {
                makeWeekCalendar().map((d, i) => (
                    <Grid xs={1.7} key={`wkc-${i}`}>
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
                                      prop.handleOpen(x)
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
