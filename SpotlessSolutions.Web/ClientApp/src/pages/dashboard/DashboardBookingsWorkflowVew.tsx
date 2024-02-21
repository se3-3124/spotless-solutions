import { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'

import './dashboard.scss'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'

import AuthContext from '../../contexts/AuthContext.ts'
import { type BookingResponseType, BookingStatus } from '../../types/BookingResponseType.tsx'
import BookingsDetailModal from './components/modals/BookingDetailModal.tsx'

export default function DashboardBookingsWorkflowView () {
  const [activeDetailView, setActiveDetailView] = useState<BookingResponseType | null>(null)
  const [bookings, setBookings] = useState<BookingResponseType[]>([])
  const { request } = useContext(AuthContext)

  useEffect(() => {
    async function retrieveAllBookings () {
      if (request === null) {
        return
      }

      const currentYear = new Date().getFullYear()
      const start = new Date(currentYear, 0, 1)
      const end = new Date(currentYear + 1, 1, 1)

      const response = await request
        .get<{ success: boolean, result: BookingResponseType[] }>(`/api/bookings/admin/range?start=${start.toISOString()}&end=${end.toISOString()}`)

      setBookings(response.data.result)
    }

    retrieveAllBookings().catch(console.error)
  }, [])

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
                    <Box sx={{ flexGrow: 1 }}>
                        <main className='p-3 flex'>
                            {/* To be Approved */}
                            <div className='p-3 w-80 bg-gray-200 rounded-md'>
                                <h3 className='text-sm font-medium text-gray-900'>To be Approved</h3>
                                <ul className='mt-2'>
                                    {
                                        bookings
                                          .filter(x => x.status === BookingStatus.Pending)
                                          .map((x, i) => (
                                                <li
                                                    key={`tba-${i}`}
                                                    className="block p-5 bg-white rounded-md shadow mb-2"
                                                    onClick={() => { handleOpen(x) }}
                                                >
                                                    <div className="text-sm font-medium leading-snug text-gray-900">
                                                        {x.mainService.service.name}
                                                        <br />
                                                        {
                                                            Intl
                                                              .DateTimeFormat('en-US', {
                                                                formatMatcher: 'best fit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                day: 'numeric'
                                                              })
                                                              .format(new Date(x.schedule))
                                                        }
                                                        <br />
                                                        {
                                                            Intl
                                                              .DateTimeFormat('en-US', {
                                                                formatMatcher: 'best fit',
                                                                hour: 'numeric',
                                                                minute: 'numeric'
                                                              })
                                                              .format(new Date(x.schedule))
                                                        }
                                                        <br />
                                                        Total: ₱ {x.totalPrice}
                                                    </div>
                                                </li>
                                          ))
                                    }
                                </ul>
                            </div>

                            {/* Request for Clarification */}
                            <div className='ml-2 p-3 w-80 bg-gray-200 rounded-md'>
                                <h3 className='text-sm font-medium text-gray-900'>Request for Clarification</h3>
                                <ul className='mt-2'></ul>
                            </div>

                            {/* Approved */}
                            <div className='ml-2 p-3 w-80 bg-gray-200 rounded-md'>
                                <h3 className='text-sm font-medium text-gray-900'>Approved</h3>
                                <ul className='mt-2'>
                                    {
                                        bookings
                                          .filter(x => x.status === BookingStatus.Approved)
                                          .map((x, i) => (
                                                <li
                                                    key={`tba-${i}`}
                                                    className="block p-5 bg-white rounded-md shadow mb-2"
                                                    onClick={() => { handleOpen(x) }}
                                                >
                                                    <div className="text-sm font-medium leading-snug text-gray-900">
                                                        {x.mainService.service.name}
                                                        <br/>
                                                        {
                                                            Intl
                                                              .DateTimeFormat('en-US', {
                                                                formatMatcher: 'best fit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                day: 'numeric'
                                                              })
                                                              .format(new Date(x.schedule))
                                                        }
                                                        <br/>
                                                        {
                                                            Intl
                                                              .DateTimeFormat('en-US', {
                                                                formatMatcher: 'best fit',
                                                                hour: 'numeric',
                                                                minute: 'numeric'
                                                              })
                                                              .format(new Date(x.schedule))
                                                        }
                                                        <br/>
                                                        Total: ₱ {x.totalPrice}
                                                    </div>
                                                </li>
                                          ))
                                    }
                                </ul>
                            </div>

                            {/* Rejected */}
                            <div className='ml-2 p-3 w-80 bg-gray-200 rounded-md'>
                            <h3 className='text-sm font-medium text-gray-900'>Rejected</h3>
                                <ul className='mt-2'>
                                    {
                                        bookings
                                          .filter(x => x.status === BookingStatus.Rejected)
                                          .map((x, i) => (
                                                <li
                                                    key={`tba-${i}`}
                                                    className="block p-5 bg-white rounded-md shadow mb-2"
                                                    onClick={() => { handleOpen(x) }}
                                                >
                                                    <div className="text-sm font-medium leading-snug text-gray-900">
                                                        {x.mainService.service.name}
                                                        <br/>
                                                        {
                                                            Intl
                                                              .DateTimeFormat('en-US', {
                                                                formatMatcher: 'best fit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                day: 'numeric'
                                                              })
                                                              .format(new Date(x.schedule))
                                                        }
                                                        <br/>
                                                        {
                                                            Intl
                                                              .DateTimeFormat('en-US', {
                                                                formatMatcher: 'best fit',
                                                                hour: 'numeric',
                                                                minute: 'numeric'
                                                              })
                                                              .format(new Date(x.schedule))
                                                        }
                                                        <br/>
                                                        Total: ₱ {x.totalPrice}
                                                    </div>
                                                </li>
                                          ))
                                    }
                                </ul>
                            </div>
                        </main>
                    </Box>
                </Stack>
            </Box>
            {/* Modal */}
            <BookingsDetailModal data={activeDetailView} handleClose={handleClose} />
        </>
  )
}
