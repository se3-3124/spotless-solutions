import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './OAuthGenericDesign.scss'

import PageContentCommons from '../../Components/PageContentCommons.tsx'

export default function OAuthSuccess () {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
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
