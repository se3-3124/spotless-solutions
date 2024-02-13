import { type AxiosInstance } from 'axios'
import { createContext } from 'react'

import { type UserData } from '../types/UserData.ts'

export interface AuthenticationContextType {
  /**
   * Retrieves authenticated user
   */
  user: UserData | null
  /**
   * Sets the authenticated user
   * @param {string} token User session token
   * @param {string} refreshToken User refresh token
   */
  setAuthenticatedUser: (token: string, refreshToken: string) => boolean
  /**
   * Clears all authentication details
   */
  removeAuthenticationTokens: () => void
  request: AxiosInstance | null
}

export default createContext<AuthenticationContextType>({} as unknown as AuthenticationContextType)
