import { DateTime } from 'luxon'
import { type SyntheticEvent, useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

import { BsCalendar2 } from 'react-icons/bs'

import type { ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface DatePickerFieldProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function DatePickerField (props: DatePickerFieldProps) {
  const [activeDate, setActiveDate] = useState<DateTime>(DateTime.now())
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    try {
      setActiveDate(DateTime.fromJSDate(new Date(props.value)))
    } catch (_) {
      setActiveDate(DateTime.now())
    }
  }, [props.value])

  const handleOpen = (e: SyntheticEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  const handleDateChange = (date: DateTime) => {
    const result = date.toISODate()
    if (result === null) {
      return
    }

    props.onChange(props.object.configId, result)
    handleClose()
  }

  return (
    <div className="booking-input-container">
      <label htmlFor={props.object.id}>{props.object.label}</label>
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
          />
        </Popover>
      </LocalizationProvider>
    </div>
  )
}
