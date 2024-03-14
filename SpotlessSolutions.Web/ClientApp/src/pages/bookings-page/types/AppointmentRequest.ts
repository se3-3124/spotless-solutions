export interface AppointmentRequest {
  schedule: string
  addressId: string
  mainServiceId: string
  mainServiceConfig: string
  addons: Record<string, string>
}
