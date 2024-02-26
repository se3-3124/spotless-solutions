import type { Meta, StoryObj } from '@storybook/react'

import DashboardWorkflowDragAndDropComponent
  from '../pages/dashboard/components/workflow/DashboardWorkflowDragAndDropComponent.tsx'
import { mockEventData } from './commons/data.ts'

const meta = {
  title: 'Dashboard Workflow Drag and Drop Component',
  component: DashboardWorkflowDragAndDropComponent,
  tags: ['autodocs']
} satisfies Meta<typeof DashboardWorkflowDragAndDropComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    objects: mockEventData
  }
}
