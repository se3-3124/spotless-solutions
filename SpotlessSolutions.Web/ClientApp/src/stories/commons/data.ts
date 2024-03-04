import { DateTime } from 'luxon'
import { type BookingResponseType, BookingStatus } from '../../types/BookingResponseType.tsx'
import { type ServicesDataObject, ServiceType } from '../../types/ServicesDataObject.tsx'

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
      bookingDescriptor: [
        [ 'Descriptor 1' ],
        [ 'Descriptor 2', '69' ]
      ],
      calculated: 1900
    },
    addons: [
      {
        service: {
          name: 'Addon 1',
          description: 'Addon',
          id: 'addon1'
        },
        bookingDescriptor: [
          [ 'Descriptor 1' ],
          [ 'Descriptor 2', '69' ]
        ],
        calculated: 1900
      },
      {
        service: {
          name: 'Addon 2',
          description: 'Addon',
          id: 'addon1'
        },
        bookingDescriptor: [
          [ 'Descriptor 1' ],
          [ 'Descriptor 2', '1200' ]
        ],
        calculated: 1900
      }
    ],
    totalPrice: 7600
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
      bookingDescriptor: [
        [ 'Descriptor 1' ],
        [ 'Descriptor 2', '69' ]
      ],
      calculated: 1900
    },
    addons: [],
    totalPrice: 1900
  }
] satisfies BookingResponseType[]

export const mockServiceList = [
  {
    id: 'dummy.service-id',
    name: 'service name 1',
    type: ServiceType.Main,
    description: 'some description'
  },
  {
    id: 'dummy.service-id2',
    name: 'service name 2',
    type: ServiceType.Main,
    description: 'some description'
  },
  {
    id: 'dummy.service-id3',
    name: 'service name 3',
    type: ServiceType.Main,
    description: 'some description'
  },
  {
    id: 'dummy.service-id4',
    name: 'service name 4',
    type: ServiceType.Main,
    description: 'some description'
  },
  {
    id: 'dummy.addon-id',
    name: 'addon 1',
    type: ServiceType.Addon,
    description: 'some description'
  },
  {
    id: 'dummy.addon-id2',
    name: 'addon 2',
    type: ServiceType.Addon,
    description: 'some description'
  }
] satisfies ServicesDataObject[]
