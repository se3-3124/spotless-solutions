import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { HiArrowCircleRight } from 'react-icons/hi'
import { PiStarFourFill } from 'react-icons/pi'

import AuthContext from '../../contexts/AuthContext.ts'
import FooterComponent from '../../components/footer/FooterComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'
import Services from './ServicesSection.tsx'
import Whyus from './WhyUsSection.tsx'

import badge from '../../assets/badge2.png'
import desktopBG from '../../assets/CleaningServicebg.png'
import mobileBG from '../../assets/CleaningServiceMobileBG.png'
import star from '../../assets/star.svg'
import './home-page.scss'

function Home () {
  const context = useContext(AuthContext)

  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [animateBadge, setAnimateBadge] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setAnimateBadge(true)
  }, [])

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <>
      <NavigationBar user={context.user} />
      <div className="home-root">
        <img src={isSmallScreen ? mobileBG : desktopBG} alt="Background" className="home-background" />
        <img src={star} alt="TOPDOWN Logo" className="company-logo" />

        <div className="heading">
          <h1 className="u39281">
            TOPDOWN
          </h1>
          <h2 className="u71912">
            Cleaning Services Iloilo
          </h2>
          <p className="u99201 font-kaushan">
            for Ilonggos, by Ilonggos
          </p>
          <Link
            to="/"
            type="button"
            className="book-now-btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            Book Now
            {hovered
              ? (
                  <PiStarFourFill
                    size={15}
                    className="ml-2 md:ml-4 text-[#ff8e2c]"
                  />
                )
              : (
                  <HiArrowCircleRight size={20} className=" ml-2 md:ml-4" />
                )}
          </Link>
        </div>
        <div className="badge-container">
          <img
            src={badge}
            alt="Badge"
            className={`u82291 ${animateBadge && 'animate'}`} />
        </div>
        <div className="what-would-lespaul-say">
          <p className="u11282">
            Our focus is on more than just cleaning – it&lsquo;s about crafting
            exceptional experiences.
          </p>
          <p className="u82112">
            When you heard of TopDown, expect nothing less than the highest standard
            of service for your home or business.
          </p>
        </div>
        <div className="d99281">
          <Services />
        </div>
        <div className="d82129">
          <Whyus />
        </div>
        <FooterComponent />
      </div>
    </>
  )
}

export default Home
