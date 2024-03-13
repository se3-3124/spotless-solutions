export enum BookingStatus {
  Approved,
  Pending,
  Rejected,
  Completed
}

export interface ServiceBooked {
  service: {
    id: string
    description: string
    name: string
  }
  bookingDescriptor: string[][]
  calculated: number
  requiresAssessment: boolean
}

export interface BookingResponseType {
  id: string
  schedule: string
  status: BookingStatus
  address: {
    street: string
    district: string
    barangay: string
    postalCode: string
    city: string
    province: string
  }
  user: {
    userId: string
    firstName: string
    lastName: string
  }
  mainService: ServiceBooked
  addons: ServiceBooked[]
  totalPrice: number
}
