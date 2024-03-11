import { useContext } from 'react'

import AuthContext from '../../contexts/AuthContext.ts'
import FooterComponent from '../../components/footer/FooterComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'
import styles from '../../style.ts'

import tdLogo from '../../assets/td_logo.jpg'
import founder from '../../assets/founder.png'
import proprietor from '../../assets/rafael.png'
import operationsManager from '../../assets/operationsManager.jpg'

const AboutUs = () => {
  const context = useContext(AuthContext)
  return (
    <>
      <NavigationBar user={context.user} />
      <div id='main' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xs:px-8 xs:py-8 sm:py-8 sm:px-8 lg:px-8`}>
          <div className='place-items-center sm:grid-cols-1 sm:items-center grid gap-8 md:grid-cols-2 md:items-center w-full'>
            <div className='flex-1 flex-col w-full text-center'>
              <h1 className='font-poppins font-semibold ss:text-[72px] text-[52px]  text-midnightblue transition duration-350 hover:text-fruityorange hover:ease-in xs:hover:text-[60px] sm:hover:text-[85px] lg:hover:text-[96px]  cursor-pointer'>
                Who We Are
              </h1>
              <p className="mt-2 ml-8 mr-8 mb-8 text-slate-500 font-poppins ss:text-[20px] text-[16px]">
                Nestled in the heart of Iloilo City, Topdown Cleaning Services Iloilo is where professionalism
                combines with genuine enthusiasm. Our expert team doesn't just clear away dust, they
                infuse spaces with a renewed zest for life. From general touch-ups to comprehensive deep
                cleans, and the meticulous detailing after construction, we've got Iloilo and its neighboring
                provinces covered. Dive into a cleaning experience that’s relatable yet refined, where your
                space gets the elite treatment it deserves.
              </p>
            </div>
            <div className="flex-1 w-full px-6 py-6 flex justify-center items-center overflow-hidden">
              <img className="w-full h-full rounded-lg md:h-full md:w-full hover:animate-pulse transition duration-300" src={tdLogo} alt="TopDown Logo" />
            </div>
          </div>

          <div className='place-items-center sm:grid-cols-1 sm:items-center grid gap-8 md:grid-cols-2 md:items-center w-full bg-midnightblue lg:rounded-full'>
            <div className='flex-1 flex-col w-full text-center'>
              <h1 className='font-poppins font-semibold ss:text-[72px] text-[52px] text-fruityorange transition duration-350 hover:ease-in hover:text-[80px]  cursor-pointer'>
                Vision
              </h1>
              <p className="mt-2 ml-12 mr-12 mb-4 md:ml-12 md:mr-12 md:mb-4 text-white font-poppins ss:text-[24px] text-[16px]">
                Be the top-of-mind cleaning  agency in Iloilo City and Iloilo Province.
              </p>
            </div>
            <div className='flex-1 flex-col w-full text-center'>
              <h1 className='font-poppins font-semibold ss:text-[72px] text-[52px] text-fruityorange transition duration-350 hover:ease-in hover:text-[80px]  cursor-pointer'>
                Mission
              </h1>
              <p className="mt-2 ml-12 mr-12 mb-4  md:ml-12 md:mr-12 md:mb-4 text-white font-poppins ss:text-[24px] text-[16px]">
                To care of the homes of our clients like our own and ensure that it serves  as a clean and welcoming home to every Ilonggo.
              </p>
            </div>
          </div>

          <div className='place-items-center sm:grid-cols-1 sm:items-center w-full mt-12'>
            <div className='flex-1 flex-col w-full text-center'>
              <h1 className='font-poppins font-semibold ss:text-[72px] text-[52px] text-midnightblue hover:text-fruityorange hover:ease-in xs:hover:text-[60px] sm:hover:text-[85px] lg:hover:text-[96px]  cursor-pointer'>
                MEET OUR TEAM
              </h1>
            </div>
          </div>

          <div className='place-items-center sm:grid-cols-1 sm:items-center grid gap-8 md:grid-cols-2 md:items-center w-full px-16 mt-10'>
            <div className="flex items-center w-full text-center">
              <img className="w-48 h-48 rounded-lg md:h-48 md:w-48" src={proprietor} alt="Rafael Versoza" />
              <div className='flex-1 flex-col w-full text-left'>
                <h1 className="font-poppins font-semibold text-3xl text-midnightblue ml-4 transition duration-350 hover:text-fruityorange">RAFAEL VERZOSA</h1>
                <h3 className="font-poppins  text-slate-500 text-1xl text-blue ml-4">PROPRIETOR</h3>
              </div>
            </div>
            <div className="flex items-center w-full text-center">
              <img className="w-48 h-48 rounded-lg md:h-48 md:w-48" src={founder} alt="founder" />
              <div className='flex-1 flex-col w-full text-left'>
                <h1 className="font-poppins font-semibold text-3xl text-midnightblue ml-4 transition duration-350 hover:text-fruityorange">ZULEIN GARDOSE</h1>
                <h3 className="font-poppins  text-slate-500 text-1xl text-blue ml-4">FOUNDER</h3>
              </div>
            </div>
            <div className="flex items-center w-full text-center">
              <img className="w-48 h-48 rounded-lg md:h-48 md:w-48" src={operationsManager} alt="manager" />
              <div className='flex-1 flex-col w-full text-left'>
                <h1 className="font-poppins font-semibold text-3xl text-midnightblue ml-4 transition duration-350 hover:text-fruityorange">AMOR NINGUNA</h1>
                <h3 className="font-poppins text-slate-500 text-1xl text-blue ml-4">OPERATIONS MANAGER</h3>
              </div>
            </div>
          </div>
        </div>
      </div >
      <FooterComponent />
    </>
  )
}

export default AboutUs
