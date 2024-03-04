import { Fragment } from 'react'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { type BookingResponseType, BookingStatus } from '../../../../types/BookingResponseType.tsx'
import MessageComposer from '../forms/MessageComposer.tsx';

import './BookingsDetailModal.style.scss'

export interface BookingsDetailPropType {
  /**
   * Booking modal to display
   */
  data: BookingResponseType | null

  /**
   * Function to close the modal
   */
  onModalClose: () => void
}

/**
 * Bookings Modal
 */
export default function BookingsDetailModal (prop: BookingsDetailPropType) {
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

  if (prop.data === null) {
    return (<div />)
  }

  return (
    <Dialog open={Boolean(prop.data)} onClose={prop.onModalClose} maxWidth="xl" fullWidth={true} scroll="body">
      <div className="modal-container">
        <div className="modal-header-group">
          <p className="job-id">Job ID: {prop.data.id}</p>
          <Tooltip title="Queue Job" placement="top">
            <IconButton>
              <AssignmentTurnedInRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark as Complete" placement="top">
            <IconButton>
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
                    <p>{prop.data.mainService.service.name}</p>
                  </div>
                  <div className="detail-contents-value">
                    {
                      prop.data.mainService.bookingDescriptor.map((x, i) => (
                        <div key={i}>
                          {x.join(' ')}
                        </div>
                      ))
                    }
                    <b>P{prop.data.mainService.calculated}</b>
                  </div>
                </div>
              </div>

              {/* Addons Booking Quotation Information */}
              <div className="right-side-container">
                <p className="detail-header">Addons Booking Information</p>
                <div className="detail-contents-container">
                  {
                    prop.data.addons.map((x, i) => (
                      <Fragment key={i}>
                        <div className="detail-contents-field-name">
                          <p>{x.service.name}</p>
                        </div>
                        <div className="detail-contents-value">
                          {
                            x.bookingDescriptor.map((x, i) => (
                              <div key={i}>
                                {x.join(' ')}
                              </div>
                            ))
                          }
                          <b>P{x.calculated}</b>
                        </div>
                      </Fragment>
                    ))
                  }
                </div>
              </div>
              
              <p className="modal-content-small-header">Send a message:</p>
              <MessageComposer />
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="right-side-container">
                <p className="detail-header">Booking Details</p>
                <div className="detail-contents-container">
                  <div className="detail-contents-field-name">
                    <p>Owner</p>
                  </div>
                  <div className="detail-contents-value">
                    {prop.data.user.lastName}, {prop.data.user.firstName}
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Booking Schedule</p>
                  </div>
                  <div className="detail-contents-value">
                    {formatDateToReadable(new Date(prop.data.schedule))}&nbsp;
                    {formatTimeToReadable(new Date(prop.data.schedule))}
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Address</p>
                  </div>
                  <div className="detail-contents-value">
                    {prop.data.address.barangay},&nbsp;
                    {prop.data.address.district},&nbsp;
                    {prop.data.address.city},&nbsp;
                    {prop.data.address.province},&nbsp;
                    {prop.data.address.postalCode}
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Area dimensions</p>
                  </div>
                  <div className="detail-contents-value">
                    Not applicable
                  </div>
                  <div className="detail-contents-field-name">
                    <p>Booking Status</p>
                  </div>
                  <div className="detail-contents-value">
                    <select value={formatBookingStatus()}>
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
                    P{prop.data.totalPrice}
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
