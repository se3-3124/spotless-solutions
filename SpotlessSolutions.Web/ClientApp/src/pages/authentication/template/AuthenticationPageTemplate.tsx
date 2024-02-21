import { type ReactNode, useContext } from 'react'

import AuthContext from '../../../contexts/AuthContext.ts'
import FooterV2 from '../../../components/footerv2/FooterV2.tsx'
import NavigationBar from '../../../components/navigation/NavigationBar.tsx'

import houseCleaningImage from '../../../assets/house-cleaning-service.jpeg'
import './AuthenticationPageTemplate.style.scss'

export interface AuthenticationPageTemplatePropType {
  children: ReactNode
}

export default function AuthenticationPageTemplate (props: AuthenticationPageTemplatePropType) {
  const authContext = useContext(AuthContext)

  return (
    <>
      <NavigationBar user={authContext.user} />
      <div className="auth-common-wrapper">
        <div className="wrapper">
          <div className="wrapper-contents">
            <div
              className="left-image"
              style={{
                background: `#fff url(${houseCleaningImage}) no-repeat center center`,
                backgroundSize: 'cover'
              }} />
            <div className="right-side">
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <FooterV2 />
    </>
  )
}
