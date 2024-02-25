import axios from 'axios'
import * as jose from 'jose'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import AuthContext from './contexts/AuthContext.ts'
import { type UserData, UserRole } from './types/UserData.ts'

import EmailVerificationStaticStatusPage from './pages/authentication/EmailVerificationStaticStatusPage.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import DashboardBookingCalendarView from './pages/dashboard/DashboardBookingCalendarView.tsx'
import History from './pages/dashboard/history-page/history.tsx'
import Home from './pages/home-page/home-page.tsx'
import LogInPage from './pages/authentication/LoginPage.tsx'
import LogoutFlowPage from './pages/authentication/LogoutFlowPage.tsx'
import RegistrationPage from './pages/authentication/RegistrationPage.tsx'
import OAuthCatcherFlowPage from './pages/authentication/OAuthCatcherFlowPage.tsx'
import OAuthFailingPage from './pages/authentication/OAuthFailingPage.tsx'
import OAuthSuccessPage from './pages/authentication/OAuthSuccessPage.tsx'
import PasswordRecoveryPage from './pages/authentication/PasswordRecoveryPage.tsx'
import PasswordRecoveryWizardPage from './pages/authentication/PasswordRecoveryWizardPage.tsx'
import ServicesPage from './pages/services-page/services-page.tsx'

import './index.css'
import DashboardBookingsWorkflowView from './pages/dashboard/DashboardBookingsWorkflowVew.tsx'
import NotificationsContext, { NotificationSeverity } from './contexts/NotificationsContext.tsx'
import { type NotificationStateType } from './types/MainStateTypes.tsx'
import DashboardServiceManagementView from './pages/dashboard/DashboardServiceManagementView.tsx'

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
  const [notifications, setNotifications] = useState<NotificationStateType | null>()

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

  const openNotifier = (severity: NotificationSeverity, message: string): void => {
    let notificationSeverity: 'success' | 'info' | 'warning' | 'error'

    switch (severity) {
      case NotificationSeverity.Warning:
        notificationSeverity = 'warning'
        break
      case NotificationSeverity.Info:
        notificationSeverity = 'info'
        break
      case NotificationSeverity.Success:
        notificationSeverity = 'success'
        break
      default:
        notificationSeverity = 'error'
    }

    setNotifications({ severity: notificationSeverity, message })
  }

  const closeNotifier = () => {
    setNotifications(null)
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
                <NotificationsContext.Provider value={{
                  notify: (severity: NotificationSeverity, message: string) => {
                    openNotifier(severity, message)
                  }
                }}>
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
                      <Route path="/dashboard/service-management" element={<DashboardServiceManagementView />} />

                      <Route path="/" element={<Home />} />
                      <Route path="/services" element={<ServicesPage />} />

                    </Routes>
                  </BrowserRouter>
                </NotificationsContext.Provider>
            </AuthContext.Provider>
            <Snackbar open={Boolean(notifications)} autoHideDuration={6000} onClose={closeNotifier}>
              <Alert
                severity={notifications?.severity ?? 'error'}
                onClose={closeNotifier}
                variant="filled"
                sx={{ width: '100%' }}>
                {notifications?.message ?? ''}
              </Alert>
            </Snackbar>
        </ThemeProvider>
  )
}

const targetElement = document.querySelector('#root')
if (targetElement !== null) {
  ReactDOM.createRoot(targetElement).render(<Main />)
}
