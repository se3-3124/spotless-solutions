export enum BookingStatus {
  Approved,
  Done,
  Pending,
  Denied
}

export interface BookingResponseType {
  id: string
  issuedDate: string
  config: {
    homeSize: number
    bedroomCount: number
    comfortRoomCount: number
    kitchenCount: number
    livingRoomCount: number
    storageCount: number
    floorCount: number
  }
  status: BookingStatus
  address: {
    street: string
    district: string
    barangay: string
    postalCode: string
    city: string
    province: string
  }
  transportFee: number
  transportNeedsAssessment: boolean
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  servicesBooked: Array<{
    id: string
    serviceId: string
    name: string
    totalCalculation: number
  }>
  addOnsBooked: Array<{
    id: string
    addOnId: string
    name: string
    totalCalculation: number
  }>
  totalComputed: number
}
