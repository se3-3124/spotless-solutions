import { useState } from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface SidebarServiceItemProps {
  /**
   * Service ID
   */
  serviceId: string
  /**
   * Name of the service
   */
  name: string
  /**
   * Description of the service
   */
  description: string
  /**
   * Click handler of the component
   * @param {id} string ID of the service clicked
   */
  onClick: (id: string) => void
}

/**
 * Sidebar service item component
 */
export default function SidebarServiceItem ({ serviceId, name, description, onClick }: SidebarServiceItemProps) {
  const [elevationState, setElevationState] = useState(2)

  const onElementMouseOver = () => {
    setElevationState(4)
  }

  const onElementMouseOut = () => {
    setElevationState(2)
  }

  return (
    <Paper
      elevation={elevationState}
      sx={{ p: 2, mb: 2, '&:hover': { cursor: 'pointer' } }}
      onClick={() => { onClick(serviceId) }}
      onMouseEnter={onElementMouseOver}
      onMouseLeave={onElementMouseOut}
    >
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Paper>
  )
}
