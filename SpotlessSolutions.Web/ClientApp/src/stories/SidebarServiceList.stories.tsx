import type { Meta, StoryObj } from '@storybook/react'

import Grid from '@mui/material/Grid'

import ServicesEditingContext from '../pages/dashboard/contexts/ServicesEditingContext.tsx'
import SidebarServiceList from '../pages/dashboard/components/sidebar/SidebarServiceList.tsx'
import { mockServiceList } from './commons/data.ts'

const meta = {
  title: 'Sidebar Service List',
  component: SidebarServiceList,
  decorators: [
    (Story) => {
      return (
        <ServicesEditingContext.Provider value={{ services: mockServiceList, onItemSelect: (_) => { } }}>
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
    }
  ],
  tags: ['autodocs']
} satisfies Meta<typeof SidebarServiceList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
