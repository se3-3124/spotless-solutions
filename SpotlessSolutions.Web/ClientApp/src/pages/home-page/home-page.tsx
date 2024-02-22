import { useContext } from 'react'

import AuthContext from '../../contexts/AuthContext.ts'
import FooterComponent from '../../components/footer/FooterComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'

import tdLogo from '../../assets/td_logo.jpg'
import './home-page.scss'

export default function Home () {
  const context = useContext(AuthContext)

  return (
    <>
      <NavigationBar user={context.user}/>
      <section className="section-header">
        <div className="container">
          <h1 className="brand">TOPDOWN</h1>
          <h1>Cleaning</h1>
          <h1>Services Iloilo</h1>
          <h3>for Ilonggos, by Ilonggos</h3>
          <a href='#'>Book a Service</a>
        </div>
        <div className="logo-container">
          <img src={tdLogo} alt="Topdown logo"/>
        </div>
      </section>
      <section className='sectionSize'>
        <div>
          <h2 className="secondaryTitle bg-100%">WHAT WE DO</h2>
        </div>
        <div className="md:grid md:grid-cols-2 md:grid-rows-2">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h3 className="font-semibold text-2xl">Deep Cleaning</h3>
              <h6 className='secondarySpacing'>ABOUT</h6>
              <p className='font-bold'>Our flagship products for the deepest and longest lasting clean.</p>
              <h6 className='secondarySpacing'>BASE PRICE</h6>
              <p className='font-bold'>₱ 949 on 35sqm and below</p>
              <h6 className='secondarySpacing'>CONSECUTIVE</h6>
              <p className='font-bold'>₱ 28 sqm above 35sqm</p>
              <h6 className='secondarySpacing'>TRANSPORTATION</h6>
              <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='/packages/client/src/assets/cleaning_services_hp2.png' alt='' className="h-7 mr-4"/>
            <div>
              <h3 className="font-semibold text-2xl">Post Con Cleaning</h3>
              <h6 className='secondarySpacing'>ABOUT</h6>
              <p className='font-bold'>For newly constructed or renovated homes.</p>
              <h6 className='secondarySpacing'>BASE PRICE</h6>
              <p className='font-bold'>₱ 1500 on 35sqm and below</p>
              <h6 className='secondarySpacing'>CONSECUTIVE</h6>
              <p className='font-bold'>₱ 30 sqm above 35sqm</p>
              <h6 className='secondarySpacing'>TRANSPORTATION</h6>
              <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='/packages/client/src/assets/cleaning_services_hp3.png' alt='' className="h-7 mr-4"/>
            <div>
              <h3 className="font-semibold text-2xl">Routine Cleaning</h3>
              <h6 className='secondarySpacing'>ABOUT</h6>
              <p className='font-bold'>For newly constructed or renovated homes.</p>
              <h6 className='secondarySpacing'>BASE PRICE</h6>
              <p className='font-bold'>₱ 1500 on 35sqm and below</p>
              <h6 className='secondarySpacing'>CONSECUTIVE</h6>
              <p className='font-bold'>₱ 30 sqm above 35sqm</p>
              <h6 className='secondarySpacing'>TRANSPORTATION</h6>
              <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
            </div>
          </div>

          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='/packages/client/src/assets/cleaning_services_hp1.png' alt='' className="h-7 mr-4"/>
            <div>
              <h3 className="font-semibold text-2xl">General Cleaning</h3>
              <h6 className='secondarySpacing'>ABOUT</h6>
              <p className='font-bold'>For newly constructed or renovated homes.</p>
              <h6 className='secondarySpacing'>BASE PRICE</h6>
              <p className='font-bold'>₱ 1500 on 35sqm and below</p>
              <h6 className='secondarySpacing'>CONSECUTIVE</h6>
              <p className='font-bold'>₱ 30 sqm above 35sqm</p>
              <h6 className='secondarySpacing'>TRANSPORTATION</h6>
              <p className='font-bold'>₱ 200<span>*Price may be different when outside of Iloilo</span></p>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  )
}
