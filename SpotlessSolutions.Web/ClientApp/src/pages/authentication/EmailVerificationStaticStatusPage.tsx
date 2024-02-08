import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import AuthenticationPageTemplate from './template/AuthenticationPageTemplate.tsx'
import Typography from '@mui/material/Typography'

import './LoginPage.style.scss'

export default function EmailVerificationStaticStatusPage () {
  const [status] = useSearchParams()
  const navigator = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigator('/')
    }, 3000)
  })

  return (
    <AuthenticationPageTemplate>
      <h2 className="login-heading">{status.get('status') === '1' ? 'Success' : 'An unexpected error occurred.'}</h2>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        {
          status.get('status') === '1'
            ? 'Your email successfully validated. You\'ll be redirected shortly.'
            : 'Email validation failed. Request a new one later.'
        }
      </Typography>
    </AuthenticationPageTemplate>
  )
}
