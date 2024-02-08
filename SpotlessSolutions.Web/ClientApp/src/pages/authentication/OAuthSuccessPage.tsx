import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import AuthenticationPageTemplate from './template/AuthenticationPageTemplate.tsx'

import './LoginPage.style.scss'

export default function OAuthSuccessPage () {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])

  return (
    <AuthenticationPageTemplate>
      <h2 className="login-heading">Success!</h2>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Please wait while you&apos;ll be redirected.
      </Typography>
    </AuthenticationPageTemplate>
  )
}
