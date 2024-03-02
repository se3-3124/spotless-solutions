import { type AxiosInstance } from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext.ts';
import { UserData } from '../../types/UserData.ts';

interface AuthenticationResponse {
  token: string
  refreshToken: string
}

export default function SessionRefresh () {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  
  const timeoutAndNavigate = (target: string) => {
    setTimeout(() => {
      navigate(target)
    }, 2000)
  }

  useEffect(() => {
    if (context === null || context === undefined || context.user === null || context.user === undefined || context.request === null) {
      navigate('/login')
      return
    }
    
    async function refreshRequest (request: AxiosInstance, user: UserData) {
      const result = await request.post<AuthenticationResponse>('/api/auth/refresh', {
        token: user.token,
        refreshToken: user.refreshToken
      })
      
      context.setAuthenticatedUser(result.data.token, result.data.refreshToken)
    }
    
    refreshRequest(context.request, context.user)
      .then(() => {
        const next = params.get('next')
        if (next !== null) {
          timeoutAndNavigate(next)
          return
        }

        timeoutAndNavigate('/')
      })
      .catch(() => {
        context.removeAuthenticationTokens()
        timeoutAndNavigate('/login')
      })
  }, []);
  
  return (<p>Please wait...</p>)
}
