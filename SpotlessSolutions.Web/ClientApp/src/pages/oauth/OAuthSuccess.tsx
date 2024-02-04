import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './OAuthGenericDesign.scss'

import PageContentCommons from '../../Components/PageContentCommons.tsx'

export default function OAuthSuccess () {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('state') === 'registration_state') {
      setInterval(() => {
        navigate('/')
      }, 2000)

      return
    }

    setInterval(() => {
      navigate('/dashboard')
    }, 2000)
  }, [])

  return (
        <PageContentCommons active={-1}>
            <section className="oauth-container">
                <div className="wrapper">
                    <div className="inner-wrapper">
                        <div className="image"></div>
                        <div className="text-container">
                            <h2>Success!</h2>
                            <h2>
                                Please wait while you&apos;ll be redirected.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </PageContentCommons>
  )
}
