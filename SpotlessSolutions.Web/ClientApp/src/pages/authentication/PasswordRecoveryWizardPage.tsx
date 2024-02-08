import axios from 'axios'
import { useState } from 'react'

import AuthenticationPageTemplate from './template/AuthenticationPageTemplate.tsx'

interface RecoveryState {
  email: string
}

export default function PasswordRecoveryWizardPage () {
  const [data, setData] = useState<RecoveryState>({
    email: ''
  })

  const submit = async () => {
    try {
      await axios.post('/api/auth/recovery/request', {
        email: data.email
      })

      alert('Email is sent to your account!')
    } catch (e) {
      alert('Error')
    }
  }

  const submitBtnOnClick = () => {
    submit().catch(console.error)
  }

  const updateText = (targetKey: keyof RecoveryState, value: string) => {
    setData(l => {
      return {
        ...l,
        [targetKey]: value
      }
    })
  }

  return (
    <AuthenticationPageTemplate>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Recovery</h2>
      <div className="mt-4">
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="email"
          placeholder='Email'
          onInput={(e) => {
            updateText('email', e.currentTarget.value)
          }}
          value={data.email}
        />
      </div>
      <div className="mt-8">
        <button
          onClick={submitBtnOnClick}
          className="bg-midnightblue text-fruityorange font-bold py-2 px-4 w-full rounded hover:bg-fruityorange hover:text-midnightblue">
          Request for Password Reset
        </button>
      </div>
    </AuthenticationPageTemplate>
  )
}
