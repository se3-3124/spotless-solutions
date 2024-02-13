import { DateTime } from 'luxon'
import { type BookingResponseType, BookingStatus } from '../../types/BookingResponseType.tsx'

export const mockEventData = [
  {
    id: 'dummy-id-1',
    issuedDate: DateTime.now().plus({ days: 1 }).toISODate(),
    config: {
      homeSize: 0,
      bedroomCount: 1,
      comfortRoomCount: 1,
      kitchenCount: 1,
      livingRoomCount: 1,
      storageCount: 1,
      floorCount: 1
    },
    status: BookingStatus.Pending,
    address: {
      street: 'Dummy street',
      district: 'Dummy district',
      barangay: 'Dummy barangay',
      postalCode: 'Dummy postal code',
      city: 'Dummy city',
      province: 'Dummy province'
    },
    transportFee: 200,
    transportNeedsAssessment: false,
    user: {
      id: 'user-id',
      firstName: 'Dummy',
      lastName: 'user',
      email: 'dummy@user.com'
    },
    servicesBooked: [
      {
        id: 'dummy-service',
        serviceId: 'dummy-service-id',
        name: 'Dummy Booked Service',
        totalCalculation: 1900
      }
    ],
    addOnsBooked: [],
    totalComputed: 1900
  },
  {
    id: 'dummy-id-2',
    issuedDate: DateTime.now().plus({ days: 2 }).toISODate(),
    config: {
      homeSize: 0,
      bedroomCount: 1,
      comfortRoomCount: 1,
      kitchenCount: 1,
      livingRoomCount: 1,
      storageCount: 1,
      floorCount: 1
    },
    status: BookingStatus.Pending,
    address: {
      street: 'Dummy street',
      district: 'Dummy district',
      barangay: 'Dummy barangay',
      postalCode: 'Dummy postal code',
      city: 'Dummy city',
      province: 'Dummy province'
    },
    transportFee: 200,
    transportNeedsAssessment: false,
    user: {
      id: 'user-id',
      firstName: 'Dummy',
      lastName: 'user',
      email: 'dummy@user.com'
    },
    servicesBooked: [
      {
        id: 'dummy-service',
        serviceId: 'dummy-service-id',
        name: 'Dummy Booked Service',
        totalCalculation: 1900
      }
    ],
    addOnsBooked: [],
    totalComputed: 1900
  }
] satisfies BookingResponseType[]
