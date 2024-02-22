import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect, useState} from 'react'

import {type BookingResponseType, BookingStatus} from '../../../../types/BookingResponseType.tsx'
import DashboardWorkflowContext, {type ObjectBuckets} from './DashboardWorkflowContext.ts'
import DroppableContainer from './DroppableContainer.tsx'

import './DashboardWorkflowDragAndDropComponent.styles.scss'

interface DashboardWorkflowDragAndDropComponentState {
  toBeApprovedObjects: BookingResponseType[],
  approvedObjects: BookingResponseType[],
  rejectionBin: BookingResponseType[]
}

interface DashboardWorkflowDragAndDropComponentProps {
  objects: BookingResponseType[],
  onStateChange: (to: BookingStatus, id: string) => void
  onObjectClick: (data: BookingResponseType) => void
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
  }, [props.objects])
  
  const getBookingTypeMapping = (type: keyof ObjectBuckets): BookingStatus => {
    switch (type) {
      case 'approvedObjects':
        return BookingStatus.Approved
      case 'toBeApprovedObjects':
        return BookingStatus.Pending
      case 'rejectionBin':
        return BookingStatus.Rejected
    }
  }

  const moveBucket = (from: keyof ObjectBuckets, target: keyof ObjectBuckets, data: BookingResponseType) => {
    if (from === target) {
      return;
    }
    
    setObjects(l => {
      const fromGroup = [...l[from].filter(x => x.id !== data.id)]
      
      const currentObject = data;
      data.status = getBookingTypeMapping(target)
      const toGroup = [...l[target], currentObject]

      return {
        ...l,
        [from]: fromGroup,
        [target]: toGroup
      }
    })
    
    props.onStateChange(getBookingTypeMapping(target), data.id)
  }

  return (
    <DashboardWorkflowContext.Provider value={{
      buckets: objects,
      moveBucket,
      openBucket: d => props.onObjectClick(d)
    }}>
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
