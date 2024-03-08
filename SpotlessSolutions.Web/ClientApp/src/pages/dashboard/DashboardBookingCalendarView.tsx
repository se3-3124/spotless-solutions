import { type AxiosInstance } from 'axios'
import { DateTime } from 'luxon'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

import AuthContext from '../../contexts/AuthContext.ts'
import BookingsDetailModal from './components/modals/BookingDetailModal.tsx'
import { type BookingResponseType, type BookingStatus } from '../../types/BookingResponseType.tsx'
import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import MonthCalendarComponent from '../../components/calendars/MonthCalendarComponent.tsx'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import StyledMenu from './components/mui-templates/StyledMenu.tsx'
import WeeklyCalendarComponent from '../../components/calendars/WeeklyCalendarComponent.tsx'

import './dashboard.scss'

type CalendarViewState = 'monthly' | 'weekly'

export default function DashboardBookingCalendarView () {
  const context = useContext(AuthContext)
  const notificationsContext = useContext(NotificationsContext)
  const navigator = useNavigate()

  const [activeCalendarView, setActiveCalendarView] = useState<Date>(new Date())
  const [activeDetailView, setActiveDetailView] = useState<BookingResponseType | null>(null)
  const [calendarChangeMenuAnchor, setCalendarChangeMenuAnchor] = useState<HTMLElement | null>(null)
  const [calendarData, setCalendarData] = useState<BookingResponseType[]>([])
  const [calendarViewState, setCalendarViewState] = useState<CalendarViewState>('monthly')
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false)

  useEffect(() => {
    if (context.user === null) {
      notificationsContext.notify(NotificationSeverity.Error, 'Unauthorized.')
      navigator('/')
    }
  }, [context.user, notificationsContext])

  const updateActiveModalDetail = (data: BookingResponseType[]) => {
    if (activeDetailView !== null) {
      const update = data
        .filter(x => x.id === activeDetailView.id)

      if (update.length === 0) {
        return
      }
      setActiveDetailView(update[0])
    }
  }

  const fetchWeeklyCalendarEvents = async (request: AxiosInstance, start: DateTime, end: DateTime) => {
    const startISOString = start.toJSDate().toISOString()
    const endISOString = end.toJSDate().toISOString()

    const requestPath = `/api/v1/bookings/administrative/range?start=${startISOString}&end=${endISOString}`
    const response = await request
      .get<{ success: boolean, data: BookingResponseType[] }>(requestPath)

    setCalendarData(response.data.data)
    updateActiveModalDetail(response.data.data)
  }

  const fetchMonthCalendarEvents = async (request: AxiosInstance, date: DateTime) => {
    const requestPath = `/api/v1/bookings/administrative/monthly?year=${date.year}&month=${date.month}`
    const response = await request
      .get<{ success: boolean, data: BookingResponseType[] }>(requestPath)

    setCalendarData(response.data.data)
    updateActiveModalDetail(response.data.data)
  }

  // Effect for changing view state
  useEffect(() => {
    if (context.request === null) {
      return
    }

    if (calendarViewState === 'weekly') {
      const date = DateTime.fromJSDate(activeCalendarView)
      const startOfWeek = date.startOf('week')
      const endOfWeek = date.endOf('week')

      fetchWeeklyCalendarEvents(context.request, startOfWeek, endOfWeek).catch(() => {
        notificationsContext.notify(NotificationSeverity.Error, 'Failed to fetch calendar data.')
      })

      return
    }

    const date = DateTime.fromJSDate(activeCalendarView)
    fetchMonthCalendarEvents(context.request, date).catch(() => {
      notificationsContext.notify(NotificationSeverity.Error, 'Failed to fetch calendar data.')
    })
  }, [activeCalendarView, calendarViewState, triggerRefresh])

  const handleCalendarChangeMenuAnchor = (e: React.MouseEvent<HTMLElement>) => {
    setCalendarChangeMenuAnchor(e.currentTarget)
  }

  const handleCalendarChangeMenuClose = () => { setCalendarChangeMenuAnchor(null) }

  const moveToPrevious = () => {
    if (calendarViewState === 'monthly') {
      setActiveCalendarView(d => {
        const current = DateTime.fromJSDate(d)
        return current.minus({ months: 1 }).toJSDate()
      })
      return
    }

    setActiveCalendarView(d => {
      const current = DateTime.fromJSDate(d)
      return DateTime.fromObject({ weekYear: current.year, weekNumber: current.weekNumber })
        .minus({ weeks: 1 }).toJSDate()
    })
  }

  const moveToNext = () => {
    if (calendarViewState === 'monthly') {
      setActiveCalendarView(d => {
        const current = DateTime.fromJSDate(d)
        return current.plus({ months: 1 }).toJSDate()
      })

      return
    }

    setActiveCalendarView(d => {
      const current = DateTime.fromJSDate(d)
      return DateTime.fromObject({ weekYear: current.year, weekNumber: current.weekNumber })
        .plus({ weeks: 1 }).toJSDate()
    })
  }

  const changeViewType = (viewType: CalendarViewState) => {
    setCalendarViewState(viewType)
    handleCalendarChangeMenuClose()
  }

  const getActiveDateWeekNumber = (): number => {
    return DateTime.fromJSDate(activeCalendarView).weekNumber
  }

  const handleOpen = (data: BookingResponseType) => {
    setActiveDetailView(data)
  }

  const handleClose = () => {
    setActiveDetailView(null)
  }

  const handleBookingStateChange = (state: BookingStatus) => {
    if (context.request === null || activeDetailView === null) {
      return
    }

    async function doUpdateState (req: AxiosInstance, id: string, to: BookingStatus) {
      await req.patch<{ success: true }>('/api/v1/bookings/administrative/state', {
        id,
        state: to
      })
    }

    doUpdateState(context.request, activeDetailView.id, state)
      .then(() => {
        setTriggerRefresh(t => !t)
        notificationsContext.notify(NotificationSeverity.Success, 'Successfully updated the state')
      })
      .catch(() => {
        notificationsContext.notify(NotificationSeverity.Error, 'Failed to update the state')
      })
  }

  return (
    <>
      <Box sx={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
        <DashboardAppBarComponent />
        <Stack direction="row">
          <DashboardDrawerComponent />
          <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ p: 2 }}
            >
              <Typography variant="h4" gutterBottom>
                {
                  calendarViewState === 'monthly'
                    ? (
                        Intl
                          .DateTimeFormat('en-US', {
                            formatMatcher: 'best fit',
                            month: 'long',
                            year: 'numeric'
                          })
                          .format(activeCalendarView)
                      )
                    : `Week ${getActiveDateWeekNumber()}`
                }
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                id="btn-calendar-view-change"
                variant="outlined"
                onClick={handleCalendarChangeMenuAnchor}
                endIcon={<KeyboardArrowDownRoundedIcon />}
              >
                Change View
              </Button>
              <Tooltip
                title={`Previous ${calendarViewState === 'monthly' ? 'Month' : 'Week'}`}
              >
                <IconButton onClick={moveToPrevious}>
                  <KeyboardArrowLeftRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={`Next ${calendarViewState === 'monthly' ? 'Month' : 'Week'}`}
              >
                <IconButton onClick={moveToNext}>
                  <KeyboardArrowRightRoundedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            {
              calendarViewState === 'monthly'
                ? (
                  <MonthCalendarComponent
                    date={DateTime.fromJSDate(activeCalendarView)}
                    events={calendarData}
                    handleOpen={handleOpen}
                  />
                  )
                : (
                  <WeeklyCalendarComponent
                    date={DateTime.fromJSDate(activeCalendarView)}
                    handleOpen={handleOpen}
                    events={calendarData}
                  />
                  )
            }
          </Box>
        </Stack>
      </Box>
      {/* Menu containers */}
      <StyledMenu
        anchorEl={calendarChangeMenuAnchor}
        open={Boolean(calendarChangeMenuAnchor)}
        onClose={handleCalendarChangeMenuClose}
        MenuListProps={{
          'aria-labelledby': 'btn-calendar-view-change'
        }}
      >
        <MenuItem onClick={() => { changeViewType('monthly') }}>Monthly View</MenuItem>
        <MenuItem onClick={() => { changeViewType('weekly') }}>Weekly View</MenuItem>
      </StyledMenu>
      {/* Modal */}
      <BookingsDetailModal
        data={activeDetailView}
        onStateChange={handleBookingStateChange}
        onModalClose={handleClose}
      />
    </>
  )
}
