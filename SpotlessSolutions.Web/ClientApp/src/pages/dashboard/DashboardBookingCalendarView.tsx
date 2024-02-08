import { DateTime } from 'luxon'
import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu, { type MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { styled, alpha } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

import BookingsDetailModal from './components/modals/BookingDetailModal.tsx'
import CalendarContext from '../../contexts/CalendarContext.ts'
import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'

import CalendarComponent from './components/calendar/CalendarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import WeeklyCalendarComponent from './components/calendar/WeeklyCalendarComponent.tsx'

import './dashboard.scss'
import { type BookingResponseType } from '../../types/BookingResponseType.tsx'

type CalendarViewState = 'monthly' | 'weekly'

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

export default function DashboardBookingCalendarView () {
  const [activeDetailView, setActiveDetailView] = useState<BookingResponseType | null>(null)
  const [activeCalendarView, setActiveCalendarView] = useState<Date>(new Date())
  const [calendarViewState, setCalendarViewState] = useState<CalendarViewState>('monthly')
  const [calendarChangeMenuAnchor, setCalendarChangeMenuAnchor] = useState<HTMLElement | null>(null)

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
                        <CalendarContext.Provider value={{ active: activeCalendarView }}>
                            {
                                calendarViewState === 'monthly'
                                  ? (
                                        <CalendarComponent handleOpen={handleOpen} />
                                    )
                                  : (
                                        <WeeklyCalendarComponent handleOpen={handleOpen} />
                                    )
                            }
                        </CalendarContext.Provider>
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
            <BookingsDetailModal data={activeDetailView} handleClose={handleClose} />
        </>
  )
}
