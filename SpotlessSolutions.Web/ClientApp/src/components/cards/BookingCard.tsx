import { type BookingResponseType, BookingStatus } from '../../types/BookingResponseType.tsx'

import './BookingCard.styles.scss'

interface BookingCardProps {
  /**
   * Booking data
   */
  booking: BookingResponseType

  /**
   * Click handles
   * @param data Booking data
   */
  handleClick: (data: BookingResponseType) => void
}

/**
 * Booking Card Interface
 */
export default function BookingCard ({ booking, handleClick }: BookingCardProps) {
  const getState = () => {
    switch (booking.status) {
      case BookingStatus.Completed:
        return 'item-done'
      case BookingStatus.Approved:
        return 'item-accepted'
      case BookingStatus.Pending:
        return 'item-pending'
      default:
        return 'item-rejected'
    }
  }

  return (
    <div className={`booking-card ${getState()}`} onClick={() => { handleClick(booking) }}>
      <p className="booking-name">{booking.mainService.service.name}</p>
    </div>
  )
}
