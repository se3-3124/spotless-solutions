import { useState, useEffect } from 'react'
import Footer2 from '../../components/footer/Footer.tsx'
import NavBar from '../../components/navigation/Navbar.tsx'
import { HiArrowCircleRight } from 'react-icons/hi'
import mobileBG from '../../assets/CleaningServiceMobileBG.png'
import desktopBG from '../../assets/CleaningServicebg.png'
import star from '../../assets/star.svg'
import Services from './ServicesSection.tsx'
import Whyus from './WhyUsSection.tsx'
import { PiStarFourFill } from 'react-icons/pi'
import badge from '../../assets/badge2.png'
import './styles.css'

function Home2 () {
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

  return (
    <>
      <NavBar />
      <div className="relative h-screen">
        <img
          src={isSmallScreen ? mobileBG : desktopBG}
          alt="Background"
          className="inset-0 w-full h-full md:object-cover md:object-center object-bottom"
        />
        <img
          src={star}
          alt="TOPDOWN Logo"
          className="absolute sm:top-52 -left-3 h-32 -mt-8 md:-left-8 md:h-44 md:-mt-24"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white">
          <h1 className="text-5xl md:text-8xl mb-4 font-bold text-[#ff8e2c] flex items-center">
            TOPDOWN
          </h1>
          <h2 className="text-3xl md:text-6xl font-bold mb-4 font">
            Cleaning Services Iloilo
          </h2>
          <p className="text-lg md:text-3xl font-kaushan mb-20">
            for Ilonggos, by Ilonggos
          </p>
          <button
            type="button"
            className="absolute bottom-64 md:bottom-52 md:left-20 hover:text-white text-[#05132F] text-sm font-bold md:text-lg flex items-center bg-[#ff8e2c] hover:bg-[#05132F] border border-transparent hover:border-white hover:border-1 px-4 py-2.5 md:px-16 md:py-3 rounded-3xl md:rounded-3xl transition-colors duration-300 ease-in-out"
            onMouseEnter={() => {
              setHovered(true)
            }}
            onMouseLeave={() => {
              setHovered(false)
            }}
          >
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
          </button>
        </div>
        <div className="md:absolute">
          <img
            src={badge}
            alt="Badge"
            className={`relative m-auto bottom-36 lg:-top-[118px] lg:left-[15%] lg:m-0 w-40 md:w-1/4 ${
              animateBadge ? 'animate-zoom-in-out' : ''
            }`}
          />
        </div>
        <div className="relative bottom-32 md:-bottom-24 lg:bottom-1 md:left-16 lg:left-1/3 mx-10 lg:mx-20 text-2xl font-medium lg:text-3xl font-roboto max-w-[90%] md:max-w-[80%] lg:max-w-[45%]">
          <p className="text-blue-900 mb-6">
            Our focus is on more than just cleaning – it&lsquo;s about crafting
            exceptional experiences.
          </p>
          <p className="text-[#DBAF5A] -mb-20 md:mb-10">
            When you heard of TopDown, expect nothing less than the highest standard
            of service for your home or business.
          </p>
        </div>
        <div>
          <Services />
        </div>
        <div className='md:mt-10 md:mb-10'>
          <Whyus />
        </div>
      <Footer2 />
      </div>
    </>
  )
}

export default Home2
