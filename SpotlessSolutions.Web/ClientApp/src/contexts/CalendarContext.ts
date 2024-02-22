import { createContext } from 'react'

export interface CalendarContextType {
  active: Date
}

export default createContext<CalendarContextType>({
  active: new Date()
})
