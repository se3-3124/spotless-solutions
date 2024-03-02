import type { AxiosInstance } from 'axios'
import { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import BookingsDetailModal from './components/modals/BookingDetailModal.tsx'
import { type BookingResponseType, type BookingStatus } from '../../types/BookingResponseType.tsx'
import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import DashboardWorkflowDragAndDropComponent from './components/workflow/DashboardWorkflowDragAndDropComponent.tsx'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import useSession from '../../hooks/useSession.ts'

import './dashboard.scss'

export default function DashboardBookingsWorkflowView () {
  const { request } = useSession()
  const context = useContext(NotificationsContext)

  const [activeDetailView, setActiveDetailView] = useState<BookingResponseType | null>(null)
  const [bookings, setBookings] = useState<BookingResponseType[]>([])

  useEffect(() => {
    async function retrieveAllBookings (request: AxiosInstance) {
      const currentYear = new Date().getFullYear()
      const start = new Date(currentYear, 0, 1)
      const end = new Date(currentYear + 1, 1, 1)

      const response = await request
        .get<{ success: boolean, data: BookingResponseType[] }>(`/api/v1/bookings/administrative/range?start=${start.toISOString()}&end=${end.toISOString()}`)

      setBookings(response.data.data)
    }

    retrieveAllBookings(request).catch(console.error)
  }, [])

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
      <BookingsDetailModal data={activeDetailView} handleClose={handleClose} />
    </>
  )
}
