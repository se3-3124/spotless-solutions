import { type AxiosInstance } from 'axios'
import { type ChangeEvent, Fragment, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import AuthContext from '../../../../contexts/AuthContext.ts'
import { type BookingResponseType, BookingStatus } from '../../../../types/BookingResponseType.tsx'
import { type EmailDetailRequest } from '../../../../types/EmailDetailRequest.ts'
import MessageComposer from '../forms/MessageComposer.tsx'
import NotificationsContext, { NotificationSeverity } from '../../../../contexts/NotificationsContext.tsx'

import './BookingsDetailModal.style.scss'

export interface BookingsDetailPropType {
  /**
   * Booking modal to display
   */
  data: BookingResponseType | null

  /**
   * Function to update the state of the booking
   * @param status
   */
  onStateChange: (status: BookingStatus) => void

  /**
   * Function to close the modal
   */
  onModalClose: () => void
}

function PhotoRender (props: { userId: string, attachmentId: string }) {
  const [image, setImage] = useState<string | null>(null)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (authContext.request === null) {
      return
    }

    async function requestImage (req: AxiosInstance) {
      const response = await req
        .get<ArrayBuffer>(`/api/v1/bookings/attachments?userId=${props.userId}&attachmentId=${props.attachmentId}`, {
        responseType: 'arraybuffer'
      })

      const data = new Uint8Array(response.data)
      let raw = ''
      for (let i = 0; i < data.length; i++) {
        raw += String.fromCharCode(data[i])
      }
      return btoa(raw)
    }

    requestImage(authContext.request)
      .then(x => { setImage(`data:image;base64,${x}`) })
      .catch(console.error)
  }, [])

  if (image === null) {
    return (<p>Rendering photo...</p>)
  }

  return (
    <img width="360" src={image} alt="Attachment photo" style={{ marginBottom: '8px' }} />
  )
}

/**
 * Bookings Modal
 */
export default function BookingsDetailModal (prop: BookingsDetailPropType) {
  const authContext = useContext(AuthContext)
  const notificationContext = useContext(NotificationsContext)

  const formatBookingStatus = (): string => {
    switch ((prop.data ?? { status: BookingStatus.Pending }).status) {
      case BookingStatus.Approved:
        return 'Approved'
      case BookingStatus.Rejected:
        return 'Denied'
      case BookingStatus.Completed:
        return 'Done'
      case BookingStatus.Pending:
        return 'Pending'
    }
  }

  const updateBookingState = (status: string) => {
    let state: BookingStatus

    switch (status) {
      case 'Approved':
        state = BookingStatus.Approved
        break
      case 'Denied':
        state = BookingStatus.Rejected
        break
      case 'Done':
        state = BookingStatus.Completed
        break
      default:
        state = BookingStatus.Pending
    }

    prop.onStateChange(state)
  }

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateBookingState(e.currentTarget.value)
  }

  const formatDateToReadable = (date: Date): string => {
    return Intl
      .DateTimeFormat('en-US', {
        formatMatcher: 'best fit',
        month: 'long',
        year: 'numeric',
        day: 'numeric'
      })
      .format(date)
  }

  const formatTimeToReadable = (date: Date): string => {
    return Intl
      .DateTimeFormat('en-US', {
        formatMatcher: 'best fit',
        hour: 'numeric',
        minute: 'numeric'
      })
      .format(date)
  }

  const handleSendMessage = (subject: string, data: string) => {
    if (prop.data === null || authContext.request === null) {
      return
    }

    const mail: EmailDetailRequest = {
      userId: prop.data.user.userId,
      subject,
      body: data
    }

    async function sendMail (req: AxiosInstance) {
      await req.post<{ success: true }>('/api/v1/bookings/administrative/message', mail)
    }

    sendMail(authContext.request)
      .then(() => {
        notificationContext.notify(NotificationSeverity.Success, 'Email sent!')
      })
      .catch(() => {
        notificationContext.notify(NotificationSeverity.Error, "Email wasn't sent due to an exception.")
      })
  }

  const data = prop.data
  if (data === null) {
    return (<div />)
  }

  return (
    <Dialog open={Boolean(data)} onClose={prop.onModalClose} maxWidth="xl" fullWidth={true} scroll="body">
      <div className="modal-container">
        <div className="modal-header-group">
          <p className="job-id">Job ID: {data.id}</p>
          <Tooltip title="Queue Job" placement="top">
            <IconButton onClick={() => { updateBookingState('Approved') }}>
              <AssignmentTurnedInRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark as Complete" placement="top">
            <IconButton onClick={() => { updateBookingState('Done') }}>
              <CheckRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close" placement="top">
            <IconButton onClick={prop.onModalClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="modal-contents">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {/* Main Service Booking Quotation Information */}
              <div className="right-side-container">
                <p className="detail-header">Main Service Booking Quotation</p>
                <div className="detail-contents-container">
                  <div className="detail-contents-field-name">
                    <p>{data.mainService.service.name}</p>
                  </div>
                  <div className="detail-contents-value">
                    {
                      data.mainService.bookingDescriptor.map((x, i) => (
                        <div key={i}>
                          {x.join(' ')}
                        </div>
                      ))
                    }
                    <b>P{data.mainService.calculated}</b>
                  </div>
                </div>
              </div>

              {/* Addons Booking Quotation Information */}
              <div className="right-side-container">
                <p className="detail-header">Addons Booking Information</p>
                <div className="detail-contents-container">
                  {
                    data.addons.map((x, i) => (
                      <Fragment key={i}>
                        <div className="detail-contents-field-name">
                          <p>{x.service.name}</p>
                        </div>
                        <div className="detail-contents-value">
                          {
                            x.bookingDescriptor.map((x, i) => (
                              <div key={i}>
                                {
                                  x[0] === 'Photo Attachment'
                                    ? (<PhotoRender userId={data.user.userId} attachmentId={x[1]} />)
                                    : (<span>{x.join(' ')}</span>)
                                }
                              </div>
                            ))
                          }
                          <b>
                            P{x.calculated} {x.requiresAssessment && '(Requires Assessment)'}
                          </b>
                        </div>
                      </Fragment>
                    ))
                  }
                </div>
              </div>

              <p className="modal-content-small-header">Send a message:</p>
              <MessageComposer onSendMessage={handleSendMessage} />
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="right-side-container">
                <p className="detail-header">Booking Details</p>
                <div className="detail-contents-container">
                  <div className="detail-contents-field-name">
                    <p>Owner</p>
                  </div>
                  <div className="detail-contents-value">
                    {data.user.lastName}, {data.user.firstName}
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Booking Schedule</p>
                  </div>
                  <div className="detail-contents-value">
                    {formatDateToReadable(new Date(data.schedule))}&nbsp;
                    {formatTimeToReadable(new Date(data.schedule))}
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Address</p>
                  </div>
                  <div className="detail-contents-value">
                    {data.address.barangay},&nbsp;
                    {data.address.district},&nbsp;
                    {data.address.city},&nbsp;
                    {data.address.province},&nbsp;
                    {data.address.postalCode}
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Booking Status</p>
                  </div>
                  <div className="detail-contents-value">
                    <select value={formatBookingStatus()} onChange={handleStateChange}>
                      <option value="Approved">Approved</option>
                      <option value="Denied">Denied</option>
                      <option value="Done">Done</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Total</p>
                  </div>
                  <div className="detail-contents-value">
                    P{data.totalPrice}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Dialog>
  )
}
