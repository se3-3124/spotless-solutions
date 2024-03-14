import { DateTime } from 'luxon'
import { type SyntheticEvent, useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

import { BsCalendar2 } from 'react-icons/bs'

interface GenericDatePickerFieldProps {
  onChange: (value: DateTime) => void
  value: DateTime
}

export default function GenericDatePickerField (props: GenericDatePickerFieldProps) {
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

  const handleDateChange = (date: DateTime) => {
    props.onChange(date)
  }

  return (
    <div className="booking-input-container">
      <label htmlFor="date-picker-schedule-1">Date</label>
      <div className="date-picker-container">
        <input type="text" value={activeDate.toFormat('LLLL dd yyyy')} disabled />
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
          <StaticDatePicker
            value={activeDate}
            onChange={n => { handleDateChange(n ?? DateTime.now()) }}
            onAccept={handleClose}
          />
        </Popover>
      </LocalizationProvider>
    </div>
  )
}
