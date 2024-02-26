import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import SampleComponent from './experimental/SampleComponent.tsx'

const meta = {
  title: 'Sample component',
  component: SampleComponent,
  decorators: [withRouter],
  tags: ['autodocs']
} satisfies Meta<typeof SampleComponent>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultComponent: Story = {
  args: {
    text: 'Hello dave'
  }
}
