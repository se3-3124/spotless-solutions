import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext.ts'
import AuthenticationPageTemplate from './template/AuthenticationPageTemplate.tsx'
import { createInstance, postRequest } from '../../lib/fetch.ts'

import googleLogo from '../../assets/google.png'
import facebookLogo from '../../assets/facebook.png'
import './LoginPage.style.scss'

interface LoginState {
  email: string
  password: string
}

interface AuthenticationResponse {
  token: string
  refreshToken: string
  firstName: string
  lastName: string
  isAdmin: boolean
}

export default function LoginPage () {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const [data, setData] = useState<LoginState>({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (context.user === null) {
      return
    }

    // Check if there's currently a token available.
    if (context.user.token !== '') {
      navigate('/')
    }
  }, [])

  const submit = async () => {
    try {
      const result = await postRequest<AuthenticationResponse>(createInstance(), '/api/auth/login', {
        email: data.email,
        password: data.password
      })

      context.setAuthenticatedUser(result.token, result.refreshToken)
      console.log('trigger nav 2')
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  const submitBtnOnClick = () => {
    submit().catch(console.error)
  }

  const updateText = (targetKey: keyof LoginState, value: string) => {
    setData(l => {
      return {
        ...l,
        [targetKey]: value
      }
    })
  }

  return (
    <AuthenticationPageTemplate>
      <h2 className="login-heading">Hello</h2>
      <h2 className="login-heading">Welcome Back!</h2>
      <h2 className="login-heading mt-8">Log In</h2>

      {/* Email field */}
      <div className="login-field-wrapper">
        <input
          className="input-field"
          type="email"
          placeholder="Email Address"
          onInput={(e) => {
            updateText('email', e.currentTarget.value)
          }}
          value={data.email}
        />
      </div>

      {/* Password field */}
      <div className="login-field-wrapper">
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          onInput={(e) => {
            updateText('password', e.currentTarget.value)
          }}
          value={data.password}
        />
      </div>

      {/* Submit button */}
      <div className="login-field-wrapper">
        <button className="submit-btn" onClick={submitBtnOnClick}>
          Log In
        </button>
      </div>

      {/* Forgot */}
      <div className="login-field-wrapper">
        <p>
          Forgot?&nbsp;
          <Link to="/recovery"><b>Reset here</b></Link>.
        </p>
      </div>

      <div className="oauth-field-options">
        <span className="divider"/>
        <p>OR</p>
        <span className="divider"/>
      </div>
      <div className="oauth-field">
        <a href="/oauth2/google/request">
          <div className="px-4 py-3">
            <img src={googleLogo} alt="Login via Google" className=" h-8 w-8"/>
          </div>
        </a>
        <a href="#">
          <div className="px-4 py-3">
            <img src={facebookLogo} alt="Login via Facebook" className=" h-8 w-8"/>
          </div>
        </a>
      </div>
      <p className="forgot-password-field">
        Don’t have an account?&nbsp;
        <Link to="/signup">
          <b>Sign Up</b>
        </Link>
      </p>
    </AuthenticationPageTemplate>
  )
}
