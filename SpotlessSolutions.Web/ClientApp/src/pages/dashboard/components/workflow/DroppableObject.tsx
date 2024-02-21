import { DateTime } from 'luxon'
import { useDrag } from 'react-dnd'

import { type BookingResponseType } from '../../../../types/BookingResponseType.tsx'

import './DroppableObject.styles.scss'

interface DroppableObjectProps {
  index: number
  containerId: string
  object: BookingResponseType
}

export default function DroppableObject (props: DroppableObjectProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'object-data',
    item: { source: props.containerId, data: props.object },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [props.containerId, props.object])

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="droppable-object">
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
