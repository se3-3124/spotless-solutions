import { type AxiosInstance } from 'axios'
import { createContext } from 'react'

export enum UserRole {
  Administrator,
  User
}

export interface UserData {
  firstName: string
  lastName: string
  role: UserRole
  token: string
  refreshToken: string
  isEmailValidated: boolean
}

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
