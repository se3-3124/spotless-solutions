export enum ServiceType {
  Addon,
  Main
}

export interface ServicesDataObject {
  id: string
  name: string
  description: string
  type: ServiceType
}
