import { type ServicesDataObject } from '../../../types/ServicesDataObject.tsx'
import { type ServiceInputFieldObjectType } from './ServiceInputFieldObjectType.ts'

export interface OrganizedServicesType {
  mainServices: ServicesDataObject[]
  addOns: ServicesDataObject[]
}

export interface SelectedServicesType {
  mainService: string | null
  addOns: Record<string, boolean>
}

export interface OptionalCalculationProperties {
  label: string
  count: number
  id: string
}

export interface OptionalCalculationObjectType {
  bedroom: OptionalCalculationProperties
  comfortRoom: OptionalCalculationProperties
  kitchen: OptionalCalculationProperties
  livingRoom: OptionalCalculationProperties
  storageArea: OptionalCalculationProperties
  floors: OptionalCalculationProperties
}

export interface ServiceFields {
  fieldMetadata: ServiceInputFieldObjectType
  value: string | number
}

export interface ServiceConfigurationType {
  area: number
  runEstimator: boolean
  optionalValues: OptionalCalculationObjectType
  services: Record<string, Record<string, ServiceFields>>
}
