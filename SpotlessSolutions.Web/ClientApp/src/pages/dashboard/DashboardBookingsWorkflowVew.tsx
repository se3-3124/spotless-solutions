import type { AxiosInstance } from 'axios'
import { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import AuthContext from '../../contexts/AuthContext.ts'
import BookingsDetailModal from './components/modals/BookingDetailModal.tsx'
import { type BookingResponseType, type BookingStatus } from '../../types/BookingResponseType.tsx'
import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import DashboardWorkflowDragAndDropComponent from './components/workflow/DashboardWorkflowDragAndDropComponent.tsx'

import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import './dashboard.scss'

export default function DashboardBookingsWorkflowView () {
  const { request } = useContext(AuthContext)
  const context = useContext(NotificationsContext)

  const [activeDetailView, setActiveDetailView] = useState<BookingResponseType | null>(null)
  const [bookings, setBookings] = useState<BookingResponseType[]>([])
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false)

  useEffect(() => {
    async function retrieveAllBookings () {
      if (request === null) {
        return
      }

      const currentYear = new Date().getFullYear()
      const start = new Date(currentYear, 0, 1)
      const end = new Date(currentYear + 1, 1, 1)

      const response = await request
        .get<{ success: boolean, data: BookingResponseType[] }>(`/api/v1/bookings/administrative/range?start=${start.toISOString()}&end=${end.toISOString()}`)

      setBookings(response.data.data)

      if (activeDetailView != null) {
        const update = response.data.data
          .filter(x => x.id === activeDetailView.id)

        if (update.length !== 0) {
          setActiveDetailView(update[0])
        }
      }
    }

    retrieveAllBookings().catch(console.error)
  }, [triggerRefresh])

  const handleOpen = (data: BookingResponseType) => {
    setActiveDetailView(data)
  }

  async function doUpdate (req: AxiosInstance, to: BookingStatus, id: string) {
    await req.patch<{ success: true }>('/api/v1/bookings/administrative/state', {
      id,
      state: to
    })
  }

  const onStateChange = (to: BookingStatus, id: string) => {
    if (request == null) {
      return
    }

    doUpdate(request, to, id)
      .catch(() => {
        context.notify(NotificationSeverity.Error, 'Failed to update due to an error.')
      })
  }

  const handleClose = () => {
    setActiveDetailView(null)
  }

  const handleBookingStateChange = (state: BookingStatus) => {
    if (request === null || activeDetailView === null) {
      return
    }

    async function doUpdateState (req: AxiosInstance, id: string, to: BookingStatus) {
      await req.patch<{ success: true }>('/api/v1/bookings/administrative/state', {
        id,
        to
      })
    }

    doUpdateState(request, activeDetailView.id, state)
      .then(() => {
        setTriggerRefresh(t => !t)
        context.notify(NotificationSeverity.Success, 'Successfully updated the state')
      })
      .catch(() => {
        context.notify(NotificationSeverity.Error, 'Failed to update the state')
      })
  }

  return (
    <>
      <Box sx={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
        <DashboardAppBarComponent />
        <Stack direction="row">
          <DashboardDrawerComponent />
          <Box sx={{ flexGrow: 1 }}>
            <DashboardWorkflowDragAndDropComponent
              objects={bookings}
              onStateChange={onStateChange}
              onObjectClick={handleOpen}
            />
          </Box>
        </Stack>
      </Box>
      {/* Modal */}
      <BookingsDetailModal
        data={activeDetailView}
        onStateChange={handleBookingStateChange}
        onModalClose={handleClose} />
    </>
  )
}
