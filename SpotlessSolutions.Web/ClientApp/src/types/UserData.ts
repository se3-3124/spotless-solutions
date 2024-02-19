export enum UserRole {
  Administrator,
  User
}

export interface UserData {
  firstName: string
  lastName: string
  role: UserRole
  token: string
  refreshToken: string
  isEmailValidated: boolean
}
