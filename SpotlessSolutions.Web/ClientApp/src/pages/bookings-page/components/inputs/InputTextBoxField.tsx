import { type SyntheticEvent, useEffect, useState } from 'react'

import type { ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface InputFieldTextBoxProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function InputTextFieldBox (props: InputFieldTextBoxProps) {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    if (typeof props.value !== 'string') {
      setValue(props.value.toString())
      return
    }

    setValue(props.value)
  }, [props.value])

  const handleChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    props.onChange(props.object.configId, e.currentTarget.value)
  }

  return (
    <div className="booking-input-container">
      <label htmlFor={props.object.id}>{props.object.label}</label>
      <div className="textbox-container">
        <textarea
          id={props.object.id}
          value={value}
          onChange={handleChange}
          placeholder={props.object.label}
        />
      </div>
    </div>
  )
}
