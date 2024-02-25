import { useContext } from 'react'
import { useDrop } from 'react-dnd'

import DashboardWorkflowContext, { type ObjectBuckets } from './DashboardWorkflowContext.ts'
import DroppableObject from './DroppableObject.tsx'

import './DroppableContainer.styles.scss'
import { type BookingResponseType } from '../../../../types/BookingResponseType.tsx'

interface DroppableContainerProps {
  objectId: keyof ObjectBuckets
  containerName: string
}

export default function DroppableContainer (props: DroppableContainerProps) {
  const { buckets, moveBucket } = useContext(DashboardWorkflowContext)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'object-data',
    drop: (item: { source: keyof ObjectBuckets, data: BookingResponseType }) => {
      moveBucket(item.source, props.objectId, item.data)
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }), [])

  return (
    <div className="droppable-container" style={{ opacity: isOver ? 0.5 : 1 }}>
      <h3 className="header">{props.containerName}</h3>
      <div ref={drop} className="droppable-window">
        {buckets[props.objectId].map((object, index) => (
          <DroppableObject key={index} index={index} object={object} containerId={props.objectId} />
        ))}
      </div>
    </div>
  )
}
