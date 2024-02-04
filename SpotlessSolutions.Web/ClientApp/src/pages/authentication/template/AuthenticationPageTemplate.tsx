import { type ReactNode } from 'react'

import PageContentCommons from '../../../Components/PageContentCommons.tsx'

import houseCleaningImage from '../../../assets/house-cleaning-service.jpeg'
import './AuthenticationPageTemplate.style.scss'

export interface AuthenticationPageTemplatePropType {
  children: ReactNode
}

export default function AuthenticationPageTemplate (props: AuthenticationPageTemplatePropType) {
  return (
    <PageContentCommons active={-1}>
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
    </PageContentCommons>
  )
}
