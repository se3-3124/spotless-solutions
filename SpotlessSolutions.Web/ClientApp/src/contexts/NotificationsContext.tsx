import { createContext } from 'react'

export enum NotificationSeverity {
  Success,
  Warning,
  Error,
  Info
}

export interface NotificationsContextType {
  notify: (severity: NotificationSeverity, message: string) => void
}

export default createContext<NotificationsContextType>({} as unknown as NotificationsContextType)
