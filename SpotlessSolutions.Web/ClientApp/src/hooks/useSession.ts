import { DateTime } from 'luxon'
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AuthContext from '../contexts/AuthContext.ts'
import NotificationsContext, { NotificationSeverity } from '../contexts/NotificationsContext.tsx'

function shouldRefresh (from: Date) {
  const dateFrom = DateTime.fromJSDate(from, { zone: 'utc' })
  const dateTo = DateTime.utc()

  console.log(dateFrom, dateTo, dateFrom.minus(dateTo.valueOf()).valueOf())
  return dateFrom.minus(dateTo.valueOf()).valueOf() <= (5 * 60 * 1000)
}

export default function useSession () {
  const context = useContext(AuthContext)
  const notificationsContext = useContext(NotificationsContext)
  const navigator = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (context.user === null || context.request === null) {
      notificationsContext.notify(NotificationSeverity.Error, 'Unauthorized')
      navigator('/')

      return
    }

    // Check if session reaches its lifetime
    if (shouldRefresh(context.user.expires)) {
      navigator(`/auth/session?next=${location.pathname}`)
    }
  }, [])

  return {
    user: context.user!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    request: context.request! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
}
