import { type AxiosInstance } from 'axios'
import { type SyntheticEvent, useContext, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

import AuthContext from '../../../../contexts/AuthContext.ts'
import type { ServiceInputFieldObjectType } from '../../types/ServiceInputFieldObjectType.ts'

interface FileUploadFieldProps {
  object: ServiceInputFieldObjectType
  onChange: (key: string, value: string | number) => void
  value: string | number
}

export default function FileUploadField (props: FileUploadFieldProps) {
  const authContext = useContext(AuthContext)
  const [uploaded, setUploaded] = useState<boolean>(false)

  useEffect(() => {
    const value = props.value as string
    if (value.length >= 1) {
      setUploaded(true)
    }
  }, [])

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (authContext.request === null) {
      return
    }

    const files = e.currentTarget.files
    if (files === null) {
      return
    }

    const file = files.item(0)
    if (file === null) {
      return
    }

    async function uploadImage (req: AxiosInstance, file: File) {
      const result = await req.post<{ success: true, attachmentId: string }>('/api/v1/bookings/appointment/upload', {
        file
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return result.data.attachmentId
    }

    uploadImage(authContext.request, file)
      .then(d => {
        props.onChange(props.object.configId, d)
        setUploaded(true)
      })
      .catch(console.error)
  }

  return (
    <div className="booking-input-container">
      <label htmlFor={props.object.id}>{props.object.label}</label>
      <div className="file-upload-field">
        <input
          id={props.object.id}
          type="file"
          onChange={handleChange}
          aria-describedby={`${props.object.id}_helper`}
        />
        {
          uploaded && (
            <div className="checkmark">
              <Tooltip title="File is uploaded successfully.">
                <CheckCircleRoundedIcon fontSize="small" color="success" />
              </Tooltip>
            </div>
          )
        }
      </div>
      <p id={`${props.object.id}_helper`} className="helper-text">PNG or JPG (10MB maximum).</p>
    </div>
  )
}
