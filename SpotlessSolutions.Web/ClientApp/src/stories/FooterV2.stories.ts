import type { Meta, StoryObj } from '@storybook/react'

import FooterV2 from '../components/footerv2/FooterV2.tsx'

const meta = {
  title: 'Footer V2',
  component: FooterV2,
  tags: ['autodocs']
} satisfies Meta<typeof FooterV2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
