import type { Meta, StoryObj } from '@storybook/react'

import Grid from '@mui/material/Grid'

import ServicesEditingContext from '../pages/dashboard/contexts/ServicesEditingContext.tsx'
import SidebarServiceItem from '../pages/dashboard/components/sidebar/SidebarServiceItem.tsx'

const meta = {
  title: 'Sidebar Service Item',
  component: SidebarServiceItem,
  decorators: [
    (Story) => (
      <ServicesEditingContext.Provider value={{ services: [], onItemSelect: (i, t) => { console.log(i, t) } }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Story />
          </Grid>
          <Grid item xs={8}>
            Component goes here
          </Grid>
        </Grid>
      </ServicesEditingContext.Provider>
    )
  ],
  tags: ['autodocs']
} satisfies Meta<typeof SidebarServiceItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    serviceId: 'dummy.service-id',
    name: 'Service',
    description: 'some service description',
    onClick: (id) => { console.log(id) }
  }
}
