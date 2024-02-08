import axios, { type AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { type CommonException } from '../../types/AxiosExceptionTypes.tsx'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'

import AuthenticationPageTemplate from './template/AuthenticationPageTemplate.tsx'

import googleLogo from '../../assets/google.png'
import facebookLogo from '../../assets/facebook.png'
import './RegistrationPage.style.scss'

interface UserRegistrationState {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  phoneNumber: string
}

export default function RegistrationPage () {
  const notifyContext = useContext(NotificationsContext)
  const navigator = useNavigate()
  const [data, setData] = useState<UserRegistrationState>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  })

  const submit = () => {
    if (data.password !== data.confirmPassword) {
      notifyContext.notify(NotificationSeverity.Error, 'Error: Passwords do not match!')
      return
    }

    async function runSubmission () {
      try {
        await axios.post('/api/auth/register', {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber
        })

        notifyContext.notify(NotificationSeverity.Success, 'Registration success! Check your email for confirmation.')
        navigator('/')
      } catch (e) {
        const exception = e as AxiosError<CommonException>
        if (exception.response !== null && exception.response !== undefined) {
          notifyContext.notify(NotificationSeverity.Error, 'Error: ' + exception.response.data.messages.join(', '))
          return
        }

        notifyContext.notify(NotificationSeverity.Error, (e as Error).message)
      }
    }

    runSubmission().catch(console.error)
  }

  const updateText = (targetKey: keyof UserRegistrationState, value: string) => {
    setData(l => {
      return {
        ...l,
        [targetKey]: value
      }
    })
  }

  return (
    <AuthenticationPageTemplate>
      <h2 className="signup-text">Sign Up</h2>

      {/* Email */}
      <div className="field-container">
        <input
          className="field-input"
          type="email"
          placeholder='Email'
          onInput={(e) => {
            updateText('email', e.currentTarget.value)
          }}
          value={data.email}
        />
      </div>

      {/* Phone Number */}
      <div className="field-container">
        <input
          className="field-input"
          type="text"
          placeholder='Phone Number'
          onInput={(e) => {
            updateText('phoneNumber', e.currentTarget.value)
          }}
          value={data.phoneNumber}
        />
      </div>

      {/* First name and last name */}
      <div className="field-group">
        <input
          className="field-input"
          type="firstName"
          placeholder="First Name"
          onInput={(e) => {
            updateText('firstName', e.currentTarget.value)
          }}
          value={data.firstName}
        />
        <input
          className="field-input"
          type="lastName"
          placeholder="Last Name"
          onInput={(e) => {
            updateText('lastName', e.currentTarget.value)
          }}
          value={data.lastName}
        />
      </div>

      {/* Password and confirm password */}
      <div className="field-container">
        <input
          className="field-input"
          type="password"
          placeholder="Password"
          onInput={(e) => {
            updateText('password', e.currentTarget.value)
          }}
          value={data.password}
        />
      </div>
      <div className="field-container">
        <input
          className="field-input"
          type="password"
          placeholder="Confirm Password"
          onInput={(e) => {
            updateText('confirmPassword', e.currentTarget.value)
          }}
          value={data.confirmPassword}
        />
      </div>

      {/* Submit */}
      <div className="field-container">
        <button onClick={submit}>Sign Up</button>
      </div>

      {/* OAuth */}
      <div className="oauth-section-heading">
        <span className="divider"/>
        <p>OR</p>
        <span className="divider"/>
      </div>

      <div className="oauth-section">
        <a href="/oauth2/google/request?state=registration_state">
          <div>
            <img src={googleLogo} alt="Register via Google" />
          </div>
        </a>
        <a href="#">
          <div>
            <img src={facebookLogo} alt="Register via Facebook" />
          </div>
        </a>
      </div>
      <p className="already-sign-up">
        Already have an account?&nbsp;
        <Link to="/login"><b>Log In</b></Link>
      </p>
    </AuthenticationPageTemplate>
  )
}
