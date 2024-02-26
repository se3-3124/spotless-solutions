export enum ServiceObjectType {
  Addon,
  Main
}

export interface ServiceConfigType {
  targetingServiceId: string
  name: string
  description: string
  config: string
  type: ServiceObjectType
}
