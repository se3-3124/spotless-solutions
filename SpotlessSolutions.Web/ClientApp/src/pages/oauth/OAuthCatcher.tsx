import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext.ts'

export default function OAuthCatcher () {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokenParam, _] = useSearchParams()

  useEffect(() => {
    const token = tokenParam.get('t')
    const refresh = tokenParam.get('r')

    if (token !== null && refresh !== null) {
      const result = context.setAuthenticatedUser(token, refresh)

      if (result) {
        navigate('/auth/oauth/success')
        return
      }

      navigate('/auth/oauth/failure')
    }
  }, [])

  return (
        <>
            Please wait...
        </>
  )
}
