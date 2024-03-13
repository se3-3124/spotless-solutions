import { type ServiceInputFieldTypes } from './ServiceInputFieldTypes.ts'

export interface ServiceInputFieldObjectType {
  id: string
  label: string
  configId: string
  type: ServiceInputFieldTypes
  supportedValues: string[][]
  restrictions: Record<string, string>
}
