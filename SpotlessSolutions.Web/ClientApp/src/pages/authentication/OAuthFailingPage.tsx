import Typography from '@mui/material/Typography'

import AuthenticationPageTemplate from './template/AuthenticationPageTemplate.tsx'

import './LoginPage.style.scss'

export default function OAuthFailingPage () {
  return (
    <AuthenticationPageTemplate>
      <h2 className="login-heading">An unexpected error occurred.</h2>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        An error occurred while trying to fetch your credentials from Google. Please try again later.
      </Typography>
    </AuthenticationPageTemplate>
  )
}
