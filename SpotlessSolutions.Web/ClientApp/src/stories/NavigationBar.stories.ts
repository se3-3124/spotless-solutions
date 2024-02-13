import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import NavigationBar from '../components/navigation/NavigationBar.tsx'
import { routerDefaults } from './routingParameters.tsx'
import { UserRole } from '../types/UserData.ts'

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

export const LoggedInAsUser: Story = {
  args: {
    user: {
      firstName: 'User',
      lastName: 'User',
      role: UserRole.User,
      token: '',
      refreshToken: '',
      isEmailValidated: true
    }
  }
}

export const LoggedInAsAdministrator: Story = {
  args: {
    user: {
      firstName: 'User',
      lastName: 'User',
      role: UserRole.Administrator,
      token: '',
      refreshToken: '',
      isEmailValidated: true
    }
  }
}

export const LoggedOut: Story = {
  args: {
    user: null
  }
}
