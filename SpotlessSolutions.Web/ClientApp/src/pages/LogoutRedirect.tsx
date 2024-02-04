import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../contexts/AuthContext.ts'

export default function LogoutRedirect () {
  const context = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    context?.removeAuthenticationTokens()
    localStorage.clear() // paranoid

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }, [])

  return (
        <p>Please wait...</p>
  )
}
