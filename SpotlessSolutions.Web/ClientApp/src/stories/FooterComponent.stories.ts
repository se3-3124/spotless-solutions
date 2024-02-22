import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import FooterComponent from '../components/footer/FooterComponent.tsx'
import { routerDefaults } from './routingParameters.tsx'

const meta = {
  title: 'Footer',
  component: FooterComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: routerDefaults({ routing: { path: '/' }, location: {} })
  },
  tags: ['autodocs']
} satisfies Meta<typeof FooterComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
