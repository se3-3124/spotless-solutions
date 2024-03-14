import type { Meta, StoryObj } from '@storybook/react'

import Grid from '@mui/material/Grid'

import { mockServiceList } from './commons/data.ts'
import ServiceEditor from '../pages/dashboard/components/forms/ServiceEditor.tsx'
import ServicesEditingContext from '../pages/dashboard/contexts/ServicesEditingContext.tsx'
import SidebarServiceList from '../pages/dashboard/components/sidebar/SidebarServiceList.tsx'
import { ServiceType } from '../types/ServicesDataObject.tsx'

const meta = {
  title: 'Service Editing Story',
  component: ServiceEditor,
  decorators: [
    (Story) => (
      <ServicesEditingContext.Provider value={{ services: mockServiceList, onItemSelect: (_) => { } }}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ borderRight: '1px solid #ccc', padding: 2 }}>
            <SidebarServiceList />
          </Grid>
          <Grid item xs={8}>
            <Story />
          </Grid>
        </Grid>
      </ServicesEditingContext.Provider>
    )
  ],
  tags: ['autodocs']
} satisfies Meta<typeof ServiceEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: {
      id: 'dummy.service',
      name: 'Service A',
      description: 'service description',
      config: 'base:float:299,min:float:299,some_tuple:(float|float):(299|399)',
      type: ServiceType.Main,
      editable: true
    },
    onSubmit: (e) => { console.log(e) }
  }
}

export const NonEditableFields: Story = {
  args: {
    data: {
      id: 'dummy.service',
      name: 'Service A',
      description: 'service description',
      config: '',
      type: ServiceType.Main,
      editable: false
    },
    onSubmit: (e) => { console.log(e) }
  }
}
