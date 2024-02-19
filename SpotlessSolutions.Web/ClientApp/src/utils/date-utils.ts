import { type DateTime } from 'luxon'

export function isToday (from: DateTime, against: DateTime) {
  const timeA = from.startOf('day').toUnixInteger()
  const timeB = against.startOf('day').toUnixInteger()

  return timeA === timeB
}
