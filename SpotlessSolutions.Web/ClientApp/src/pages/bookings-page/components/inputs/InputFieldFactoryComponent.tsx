import DatePickerField from './DatePickerField.tsx'
import FileUploadField from './FileUploadField.tsx'
import InputNumericField from './InputNumericField.tsx'
import InputTextFieldBox from './InputTextBoxField.tsx'
import SelectField from './SelectField.tsx'
import { ServiceInputFieldTypes } from '../../types/ServiceInputFieldTypes.ts'
import { type ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface InputFieldFactoryComponentProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function InputFieldFactoryComponent (props: InputFieldFactoryComponentProps) {
  return (
    <div className="col-span-6">
      {
        props.object.type === ServiceInputFieldTypes.InputNumeric && (
          <InputNumericField object={props.object} onChange={props.onChange} value={props.value} />
        )
      }
      {
        props.object.type === ServiceInputFieldTypes.InputTextBox && (
          <InputTextFieldBox object={props.object} onChange={props.onChange} value={props.value} />
        )
      }
      {
        props.object.type === ServiceInputFieldTypes.Select && (
          <SelectField object={props.object} onChange={props.onChange} value={props.value} />
        )
      }
      {
        props.object.type === ServiceInputFieldTypes.InputDate && (
          <DatePickerField object={props.object} onChange={props.onChange} value={props.value} />
        )
      }
      {
        props.object.type === ServiceInputFieldTypes.FileUpload && (
          <FileUploadField object={props.object} onChange={props.onChange} value={props.value} />
        )
      }
    </div>
  )
}
