import { useContext } from 'react'

import AuthContext from '../contexts/AuthContext.ts'

export default function useUserDetails () {
  const context = useContext(AuthContext)
  return { user: context.user }
}
