import { createContext } from 'react'
import { type ServicesDataObject, type ServiceType } from '../../../types/ServicesDataObject.tsx'

export interface ServicesEditingContextType {
  services: ServicesDataObject[]
  onItemSelect: (id: string, type: ServiceType) => void
}

export default createContext<ServicesEditingContextType>({} as unknown as ServicesEditingContextType)
