import { useContext } from 'react'

import AuthContext from '../../contexts/AuthContext.ts'
import FooterComponent from '../../components/footer/FooterComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'

import './services-page.scss'

// import tdLogo from "../../assets/td_logo.jpg";

export default function Services () {
  const context = useContext(AuthContext)

  return (
    <>
      <NavigationBar user={context.user} />
      <section className="section-header">
        <div className="container">
          <h1 className="header">SERVICES OFFERED</h1>
        </div>
        {/* <div className="logo-container">
          <img src={tdLogo} alt="Topdown logo"/>
        </div> */}
      </section>
      <FooterComponent />

    </>

  )
}
