import { createContext } from 'react'

import type { BookingResponseType } from '../../../../types/BookingResponseType.tsx'

export interface ObjectBuckets {
  toBeApprovedObjects: BookingResponseType[]
  approvedObjects: BookingResponseType[]
  rejectionBin: BookingResponseType[]
}

export interface DashboardWorkflowContextType {
  buckets: ObjectBuckets
  moveBucket: (from: keyof ObjectBuckets, target: keyof ObjectBuckets, data: BookingResponseType) => void
}

export default createContext<DashboardWorkflowContextType>({} as unknown as DashboardWorkflowContextType)
