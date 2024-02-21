import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect, useState } from 'react'

import { type BookingResponseType, BookingStatus } from '../../../../types/BookingResponseType.tsx'
import DashboardWorkflowContext, { type ObjectBuckets } from './DashboardWorkflowContext.ts'
import DroppableContainer from './DroppableContainer.tsx'

import './DashboardWorkflowDragAndDropComponent.styles.scss'

interface DashboardWorkflowDragAndDropComponentState {
  toBeApprovedObjects: BookingResponseType[]
  approvedObjects: BookingResponseType[]
  rejectionBin: BookingResponseType[]
}

interface DashboardWorkflowDragAndDropComponentProps {
  objects: BookingResponseType[]
}

export default function DashboardWorkflowDragAndDropComponent (props: DashboardWorkflowDragAndDropComponentProps) {
  const [objects, setObjects] = useState<DashboardWorkflowDragAndDropComponentState>({
    toBeApprovedObjects: [],
    approvedObjects: [],
    rejectionBin: []
  })

  useEffect(() => {
    const bucket: DashboardWorkflowDragAndDropComponentState = {
      toBeApprovedObjects: [],
      approvedObjects: [],
      rejectionBin: []
    }

    for (const object of props.objects) {
      if (object.status === BookingStatus.Approved) {
        bucket.approvedObjects.push(object)
      }

      if (object.status === BookingStatus.Rejected) {
        bucket.rejectionBin.push(object)
      }

      if (object.status === BookingStatus.Pending) {
        bucket.toBeApprovedObjects.push(object)
      }
    }

    setObjects(bucket)
  }, [])

  const moveBucket = (from: keyof ObjectBuckets, target: keyof ObjectBuckets, data: BookingResponseType) => {
    setObjects(l => {
      if (from === target) {
        return l
      }

      const fromGroup = [...l[from].filter(x => x.id !== data.id)]
      const toGroup = [...l[target], data]

      return {
        ...l,
        [from]: fromGroup,
        [target]: toGroup
      }
    })
  }

  return (
    <DashboardWorkflowContext.Provider value={{ buckets: objects, moveBucket }}>
      <main className="main-wrapper">
        <DndProvider backend={HTML5Backend}>
          <DroppableContainer objectId="toBeApprovedObjects" containerName="To be approved"/>
          <DroppableContainer objectId="approvedObjects" containerName="Approved" />
          <DroppableContainer objectId="rejectionBin" containerName="Rejected" />
        </DndProvider>
      </main>
    </DashboardWorkflowContext.Provider>
  )
}
