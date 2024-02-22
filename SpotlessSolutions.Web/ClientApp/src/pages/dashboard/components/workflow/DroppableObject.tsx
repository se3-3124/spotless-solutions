import { DateTime } from 'luxon'
import { useContext } from 'react'
import { useDrag } from 'react-dnd'

import {type BookingResponseType, BookingStatus} from '../../../../types/BookingResponseType.tsx'
import DashboardWorkflowContext from './DashboardWorkflowContext.ts'

import './DroppableObject.styles.scss'

interface DroppableObjectProps {
  index: number
  containerId: string
  object: BookingResponseType
}

export default function DroppableObject (props: DroppableObjectProps) {
  const { openBucket } = useContext(DashboardWorkflowContext)
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'object-data',
    item: { source: props.containerId, data: props.object },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [])

  const getState = () => {
    switch (props.object.status) {
      case BookingStatus.Completed:
        return 'item-done'
      case BookingStatus.Approved:
        return 'item-accepted'
      case BookingStatus.Pending:
        return 'item-pending'
      default:
        return 'item-rejected'
    }
  }

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className={`droppable-object ${getState()}`} onClick={() => openBucket(props.object)}>
        <div className="service-detail">
          {props.object.mainService.service.name}
          <br/>
          {
            DateTime.fromJSDate(new Date(props.object.schedule))
              .toFormat('yyyy LLLL dd hh:mm a (cccc)')
          }
          <br/><br/>
          Total ₱{props.object.totalPrice}
        </div>
      </div>
    </div>
  )
}
