import { type SyntheticEvent, useEffect, useState } from 'react'
import type { ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface InputNumericFieldProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function InputNumericField (props: InputNumericFieldProps) {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (typeof props.value === 'string') {
      const value = Number(props.value)
      if (isNaN(value)) {
        return
      }

      setValue(value)
    } else {
      if (isNaN(props.value)) {
        return
      }

      setValue(props.value)
    }
  }, [props.value])

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (isNaN(value)) {
      return
    }

    if (value <= 0) {
      return
    }

    props.onChange(props.object.configId, value)
  }

  return (
    <div className="booking-input-container">
      <label htmlFor={props.object.id}>{props.object.label}</label>
      <input
        id={props.object.id}
        value={value}
        type="number"
        onChange={handleChange}
        placeholder={props.object.label}
        {...props.object.restrictions}
      />
    </div>
  )
}
