import { useState, useEffect } from 'react'
import Footer2 from '../../components/footer/Footer.tsx'
import NavBar from '../../components/navigation/Navbar.tsx'
import { HiArrowCircleRight } from 'react-icons/hi'
import mobileBG from '../../assets/CleaningServiceMobileBG.png'
import desktopBG from '../../assets/CleaningServicebg.png'
import star from '../../assets/star.svg'

function Home () {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

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

  return (
    <>
      <NavBar />
      <div className="relative h-screen">
        <img
          src={
            isSmallScreen
              ? mobileBG
              : desktopBG
          }
          alt="Background"
          className="inset-0 object-cover w-full h-full"
        />
        <img
          src={star}
          alt="TOPDOWN Logo"
          className="absolute top-52 -left-3 h-32 -mt-8 md:-left-8 md:h-44 md:-mt-24"
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
            className="absolute bottom-64 md:bottom-44 md:left-20 text-white text-sm font-bold md:text-lg flex items-center bg-[#ff8e2c] hover:bg-opacity-70 px-3 py-2 md:px-12 md:py-3 rounded-xl transition-colors duration-300 ease-in-out"
          >
            Book Now
            <HiArrowCircleRight size={25} className="ml-4 text-white" />
          </button>
        </div>
      </div>
      <div className="h-screen"></div>
      <Footer2 />
    </>
  )
}

export default Home
