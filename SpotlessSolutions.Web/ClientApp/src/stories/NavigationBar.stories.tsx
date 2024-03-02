import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import NavigationBar from '../components/navigation/NavigationBar.tsx'
import { routerDefaults } from './routingParameters.tsx'
import {UserData, UserRole} from '../types/UserData.ts'
import AuthContext from "../contexts/AuthContext.ts";

const meta = {
  title: 'Navigation Bar',
  component: NavigationBar,
  decorators: [withRouter],
  parameters: {
    reactRouter: routerDefaults({ routing: { path: '/' }, location: {} })
  },
  tags: ['autodocs']
} satisfies Meta<typeof NavigationBar>

export default meta
type Story = StoryObj<typeof meta>

const contextUserData = {
  firstName: 'User',
  lastName: 'User',
  role: UserRole.User,
  token: '',
  refreshToken: '',
  isEmailValidated: true,
  expires: new Date()
} satisfies UserData

export const LoggedInAsUser: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider value={{
        user: contextUserData,
        setAuthenticatedUser: (_: string, __: string) => true,
        removeAuthenticationTokens: () => true,
        request: null
      }}>
        <Story />
      </AuthContext.Provider>
    )
  ]
}

export const LoggedInAsAdministrator: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider value={{
        user: {
          ...contextUserData,
          role: UserRole.Administrator
        },
        setAuthenticatedUser: (_: string, __: string) => true,
        removeAuthenticationTokens: () => true,
        request: null
      }}>
        <Story />
      </AuthContext.Provider>
    )
  ]
}

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider value={{
        user: null,
        setAuthenticatedUser: (_: string, __: string) => true,
        removeAuthenticationTokens: () => true,
        request: null
      }}>
        <Story />
      </AuthContext.Provider>
    )
  ]
}
