import type { ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface FileUploadFieldProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function FileUploadField ({ object }: FileUploadFieldProps) {
  return (
    <div className="booking-input-container">
      <label htmlFor={object.id}>{object.label}</label>
      <input
        id={object.id}
        type="file"
        aria-describedby={`${object.id}_helper`}
      />
      <p id={`${object.id}_helper`} className="helper-text">PNG or JPG (10MB maximum).</p>
    </div>
  )
}
