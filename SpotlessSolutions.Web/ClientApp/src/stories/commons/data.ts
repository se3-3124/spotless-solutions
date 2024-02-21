import { DateTime } from 'luxon'
import { type BookingResponseType, BookingStatus } from '../../types/BookingResponseType.tsx'

export const mockEventData = [
  {
    id: 'dummy-id-1',
    schedule: DateTime.now().plus({ days: 2 }).toISODate(),
    status: BookingStatus.Pending,
    address: {
      street: 'Dummy street',
      district: 'Dummy district',
      barangay: 'Dummy barangay',
      postalCode: 'Dummy postal code',
      city: 'Dummy city',
      province: 'Dummy province'
    },
    user: {
      id: 'user-id',
      firstName: 'Dummy',
      lastName: 'user',
      email: 'dummy@user.com'
    },
    mainService: {
      service: {
        name: 'Book',
        description: 'Book',
        id: 'book'
      },
      config: ''
    },
    addons: [],
    totalPrice: 1900
  },
  {
    id: 'dummy-id-2',
    schedule: DateTime.now().plus({ days: 2 }).toISODate(),
    status: BookingStatus.Pending,
    address: {
      street: 'Dummy street',
      district: 'Dummy district',
      barangay: 'Dummy barangay',
      postalCode: 'Dummy postal code',
      city: 'Dummy city',
      province: 'Dummy province'
    },
    user: {
      id: 'user-id',
      firstName: 'Dummy',
      lastName: 'user',
      email: 'dummy@user.com'
    },
    mainService: {
      service: {
        name: 'Book',
        description: 'Book',
        id: 'book'
      },
      config: ''
    },
    addons: [],
    totalPrice: 1900
  }
] satisfies BookingResponseType[]
