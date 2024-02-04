import { createContext } from 'react'
import { type AuthenticationContextType } from '../types/AuthenticationContextType.tsx'

export default createContext<AuthenticationContextType>({} as unknown as AuthenticationContextType)
