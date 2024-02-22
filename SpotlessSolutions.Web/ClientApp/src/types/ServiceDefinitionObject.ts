import { type ServiceType } from './ServicesDataObject.tsx'

export interface ServiceDefinitionObject {
  id: string
  name: string
  description: string
  config: string
  type: ServiceType
  editable: boolean
}
