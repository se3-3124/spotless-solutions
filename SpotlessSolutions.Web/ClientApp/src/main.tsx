import axios from 'axios'
import * as jose from 'jose'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import AuthContext from './contexts/AuthContext.ts'

import { type UserData, UserRole } from './types/AuthenticationContextType.tsx'

import EmailVerificationStaticStatusPage from './pages/authentication/EmailVerificationStaticStatusPage.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import DashboardBookingCalendarView from './pages/dashboard/DashboardBookingCalendarView.tsx'
import Home from './pages/home-page/home-page.tsx'
import LogInPage from './pages/authentication/LoginPage.tsx'
import LogoutFlowPage from './pages/authentication/LogoutFlowPage.tsx'
import RegistrationPage from './pages/authentication/RegistrationPage.tsx'
import OAuthCatcherFlowPage from './pages/authentication/OAuthCatcherFlowPage.tsx'
import OAuthFailingPage from './pages/authentication/OAuthFailingPage.tsx'
import OAuthSuccessPage from './pages/authentication/OAuthSuccessPage.tsx'
import PasswordRecoveryPage from './pages/authentication/PasswordRecoveryPage.tsx'
import PasswordRecoveryWizardPage from './pages/authentication/PasswordRecoveryWizardPage.tsx'
import History from './pages/dashboard/history-page/history.tsx'

import './index.css'
import DashboardBookingsWorkflowView from './pages/dashboard/DashboardBookingsWorkflowVew.tsx'

const theme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  }
})

function Main () {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('sst')
    const refreshToken = localStorage.getItem('ssr')

    if (token === null || refreshToken === null) {
      localStorage.clear()
      return
    }

    setAuthenticatedUser(token, refreshToken)
  }, [])

  const setAuthenticatedUser = (token: string, refreshToken: string): boolean => {
    try {
      const tokenData = jose.decodeJwt(token)

      setUser({
        firstName: tokenData.first_name as string,
        lastName: tokenData.last_name as string,
        role: tokenData.user_role === 'Administrator' ? UserRole.Administrator : UserRole.User,
        token,
        refreshToken,
        isEmailValidated: tokenData.is_email_validated === '1'
      })

      localStorage.setItem('sst', token)
      localStorage.setItem('ssr', refreshToken)
    } catch (e) {
      return false
    }

    return true
  }

  const removeAuthenticationTokens = (): void => {
    localStorage.clear()
    setUser(null)
  }

  return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{
              user,
              setAuthenticatedUser,
              removeAuthenticationTokens,
              request: user !== null
                ? axios.create({
                  baseURL: window.location.origin,
                  headers: {
                    Authorization: `Bearer ${user.token}`
                  }
                })
                : null
            }}>
                {
                    ((user?.isEmailValidated) === false) && (
                        <Alert severity="warning">
                            It seems you haven&apos;t validated your email. This will impact the response times of
                            confirming your booking. Please validate your email here.
                        </Alert>
                    )
                }
                <BrowserRouter>
                    <Routes>
                        {/* Responses */}
                        <Route path="/verification/done" element={<EmailVerificationStaticStatusPage />} />

                        {/* Account Recovery */}
                        <Route path="/recovery" element={<PasswordRecoveryWizardPage />} />
                        <Route path="/recovery/change" element={<PasswordRecoveryPage />} />

                        {/* Auth related routes */}
                        <Route path="/signup" element={<RegistrationPage />} />
                        <Route path="/login" element={<LogInPage />} />
                        <Route path="/logout" element={<LogoutFlowPage />} />

                        {/* OAuth Token stuff */}
                        <Route path="/auth/oauth/success" element={<OAuthSuccessPage />} />
                        <Route path="/auth/oauth/failure" element={<OAuthFailingPage />} />
                        <Route path="/auth/oauth/catch" element={<OAuthCatcherFlowPage />} />

                        {/* Dashboard */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/calendar" element={<DashboardBookingCalendarView />} />
                        <Route path="/dashboard/history" element={<History />} />
                        <Route path="/dashboard/calendar-workflow" element={<DashboardBookingsWorkflowView />} />

                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </ThemeProvider>
  )
}

const targetElement = document.querySelector('#root')
if (targetElement !== null) {
  ReactDOM.createRoot(targetElement).render(<Main />)
}
