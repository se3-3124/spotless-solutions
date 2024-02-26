import { useContext, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

import SidebarServiceItem from './SidebarServiceItem.tsx'
import ServicesEditingContext from '../../contexts/ServicesEditingContext.tsx'
import { ServiceType } from '../../../../types/ServicesDataObject.tsx'

/**
 * Service editing sidebar component
 */
export default function SidebarServiceList () {
  const [activeView, setActiveView] = useState<ServiceType>(ServiceType.Addon)
  const context = useContext(ServicesEditingContext)

  const handleChange = (event: SelectChangeEvent) => {
    setActiveView(Number(event.target.value) as ServiceType)
  }

  return (
    <>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="sidebar-service-editing-select-label">Service Type</InputLabel>
        <Select
          labelId="sidebar-service-editing-select-label"
          id="sidebar-service-editing-select"
          label="Service Type"
          value={Number(activeView).toString()}
          onChange={handleChange}>
          <MenuItem value={Number(ServiceType.Addon).toString()}>Addons</MenuItem>
          <MenuItem value={Number(ServiceType.Main).toString()}>Main</MenuItem>
        </Select>
      </FormControl>
      {
        context.services.filter(x => x.type === activeView)
          .map((s, i) => (
            <SidebarServiceItem
              key={i}
              serviceId={s.id}
              name={s.name}
              description={s.description}
              onClick={(id) => { context.onItemSelect(id, s.type) }}
            />
          ))
      }
    </>
  )
}
