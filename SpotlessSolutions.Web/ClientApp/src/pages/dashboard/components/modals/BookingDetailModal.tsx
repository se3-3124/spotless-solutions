import Dialog from '@mui/material/Dialog'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { blue, grey } from '@mui/material/colors'

import './BookingsDetailModal.style.scss'
import { styled } from '@mui/material'
import { type BookingResponseType, BookingStatus } from '../../../../types/BookingResponseType.tsx'

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    margin-top: 15px;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 4;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
        border-color: ${blue[400]};
    }

    &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
    `
)

export interface BookingsDetailPropType {
  data: BookingResponseType | null
  handleClose: () => void
}

export default function BookingsDetailModal (prop: BookingsDetailPropType) {
  const formatBookingStatus = (): string => {
    switch ((prop.data ?? { status: BookingStatus.Pending }).status) {
      case BookingStatus.Approved:
        return 'Approved'
      case BookingStatus.Denied:
        return 'Denied'
      case BookingStatus.Done:
        return 'Done'
      case BookingStatus.Pending:
        return 'Pending'
    }
  }

  return (
        <>
            {
                prop.data !== null
                  ? (
                        <Dialog open={Boolean(prop.data)} onClose={prop.handleClose} maxWidth="md" fullWidth={true}>
                            <div className="modal-container">
                                <div className="modal-header">
                                    <h2>{prop.data?.servicesBooked[0].name}</h2>
                                    <button type='button'>
                                        <svg height="24" viewBox="0 -960 960 960" width="24">
                                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                                        </svg>
                                    </button>
                                    <button type='button' onClick={prop.handleClose}>
                                        <svg height="24" viewBox="0 -960 960 960" width="24">
                                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="modal-contents">
                                    <div className='modal-information'>
                                        <p>
                                            Name: <span className="ml-10">{prop.data.user.firstName} {prop.data.user.lastName}</span>
                                        </p>
                                        <p>
                                            Date:&nbsp;
                                            <span className="ml-12">
                                {
                                    Intl
                                      .DateTimeFormat('en-US', {
                                        formatMatcher: 'best fit',
                                        month: 'long',
                                        year: 'numeric',
                                        day: 'numeric'
                                      })
                                      .format(new Date(prop.data.issuedDate))
                                }
                                </span>
                                        </p>
                                        <p>
                                            Time:&nbsp;
                                            <span className="ml-12">
                                {
                                    Intl
                                      .DateTimeFormat('en-US', {
                                        formatMatcher: 'best fit',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                      })
                                      .format(new Date(prop.data.issuedDate))
                                }
                                </span>
                                        </p>
                                        <p>
                                            Status: <span className="ml-10">{formatBookingStatus()}</span>
                                        </p>
                                        <p>
                                            Add-ons:&nbsp;
                                            <span className="ml-5">
                                    {prop.data?.addOnsBooked.map(x => x.name).join(', ')}
                                </span>
                                        </p>
                                        <p className="mt-8">
                                            Total: <span className="ml-12">₱ {prop.data?.totalComputed}</span>
                                        </p>
                                    </div>

                                    <div className='modal-bottom'>
                                        <p>
                                            Send to: <span className="ml-4">{prop.data.user.email}</span>
                                        </p>
                                        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="message" />
                                        <button>Send</button>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    )
                  : (
                        <div></div>
                    )
            }
        </>
  )
}
