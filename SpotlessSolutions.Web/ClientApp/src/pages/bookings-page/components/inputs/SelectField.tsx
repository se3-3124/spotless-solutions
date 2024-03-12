import { type SyntheticEvent, useEffect, useState } from 'react'

import type { ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface SelectFieldProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function SelectField (props: SelectFieldProps) {
  const [fieldValue, setFieldValue] = useState<number>(0)

  useEffect(() => {
    const value = Number(props.value)

    // Replace it with default value from supported values
    if (isNaN(value)) {
      const firstSupported = props.object.supportedValues[0]
      if (firstSupported === undefined) {
        return
      }

      setFieldValue(Number(firstSupported[0]))
      return
    }

    setFieldValue(value)
  }, [props.value])

  const handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    const number = Number(e.currentTarget.value)
    if (isNaN(number)) {
      return
    }

    props.onChange(props.object.configId, number)
  }

  return (
    <div className="booking-input-container">
      <label htmlFor={props.object.id}>{props.object.label}</label>
      <select id={props.object.id} value={fieldValue} onChange={handleChange}>
        {
          props.object.supportedValues.map((x, i) => (
            <option key={i} value={x[0]}>{x[1]}</option>
          ))
        }
      </select>
    </div>
  )
}
