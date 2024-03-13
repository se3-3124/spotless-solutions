import { DateTime } from 'luxon'
import { type SyntheticEvent, useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'

import { BsCalendar2 } from 'react-icons/bs'

interface GenericTimePickerFieldProps {
  onChange: (value: DateTime) => void
  value: DateTime
}

export default function GenericTimePickerField (props: GenericTimePickerFieldProps) {
  const [activeDate, setActiveDate] = useState<DateTime>(DateTime.now())
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    setActiveDate(props.value)
  }, [props.value])

  const handleOpen = (e: SyntheticEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  const handleTimeChange = (date: DateTime) => {
    props.onChange(date)
  }

  return (
    <div className="booking-input-container">
      <label htmlFor="time-picker-sched-1">Time</label>
      <div className="date-picker-container">
        <input type="text" value={activeDate.toFormat('hh:mm a')} disabled />
        <button className="btn-picker" onClick={handleOpen}>
          <BsCalendar2 />
        </button>
      </div>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <StaticTimePicker
            value={activeDate}
            onChange={n => { handleTimeChange(n ?? DateTime.now()) }}
            onAccept={handleClose}
          />
        </Popover>
      </LocalizationProvider>
    </div>
  )
}
