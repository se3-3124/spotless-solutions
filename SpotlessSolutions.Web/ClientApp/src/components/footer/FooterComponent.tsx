import { Link } from 'react-router-dom'

import tdLogo from '../../assets/td_logo.jpg'

import './FooterComponent.style.scss'

/**
 * Footer component
 */
export default function FooterComponent () {
  return (
    <div className="footer">
      <div className="contents">
        <Link to="/">
          <img src={tdLogo} className="h-24" alt="Topdown logo"/>
        </Link>
        <div className="contact-field">
          {
            [
              {
                label: 'Email',
                value: 'example@example.com'
              },
              {
                label: 'Phone',
                value: '09171292231'
              }
            ].map((item, index) => (
              <p key={index} className={index <= 0 ? '' : 'mt-8'}>
                <b>{item.label}</b><br/>
                {item.value}
              </p>
            ))
          }
        </div>

        <div className="contact-field">
          <p className="font-bold">Socials</p>
            <p></p>
        </div>

        <div className="contact-field">
          <p className="font-bold">Site Map</p>
            <p>DAVE</p>
        </div>
      </div>

      <div className="divider"/>
      <div className="footer-bottom">
      <h1>Copyright (C) 2023 Topdown Cleaning Services</h1>
      </div>
    </div>
  )
}
