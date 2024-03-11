import { useEffect, useState, useRef } from 'react'
import { PiStarFourFill } from 'react-icons/pi'
import { FaCheck } from 'react-icons/fa'
import peoplecleaning from '../../assets/peoplecleaning.png'

function WhyUsSection () {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current
      if (element !== null) {
        const top = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        setIsVisible(top < windowHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='flex'>
      <div className="hidden md:flex md:w-1/2 lg:w-1/3">
      </div>
      <div>
      <img
        src={peoplecleaning}
        alt="People cleaning"
        className='w-96 absolute lg:left-[20%] md:left-[-2%] hidden md:flex'
        >
      </img>
      </div>
      <div className="md:w-1/2 lg:w-2/3 ml-[0] lg:ml-[15%]">
        <div className='px-4 lg:px-28 mb-10 flex flex-col'>
          <p className="flex items-center mt-2 md:mt-8 text-lg text-blue-500 md:text-2xl mb-2 font-kaushan">
            why us
            <PiStarFourFill size={15} className="ml-4 mr-4 text-[#ff8e2c]" />
            <span ref={ref} className={`line2 ${isVisible ? 'animate' : ''}`}></span>
          </p>
          <p className="text-2xl font-bold text-blue-900 md:text-4xl mb-6">
            What set us apart
          </p>
          <ul className="ml-6 font-semibold text-gray-600">
            <li className="mb-2 flex items-center">
              <FaCheck className="mr-4 text-blue-500" />
              <p className="md:text-xl">Reliability and Trustworthiness</p>
            </li>
            <li className="mb-2 flex items-center">
              <FaCheck className="mr-4 text-blue-500" />
              <p className='md:text-xl'>Experience and Expertise</p>
            </li>
            <li className="mb-2 flex items-center">
              <FaCheck className="mr-4 text-blue-500" />
              <p className='md:text-xl'>Customized Services</p>
            </li>
            <li className="mb-2 flex items-center">
              <FaCheck className="mr-4 text-blue-500" />
              <p className='md:text-xl'>Professionalism</p>
            </li>
            <li className="mb-2 flex items-center">
              <FaCheck className="mr-4 text-blue-500" />
              <p className='md:text-xl'>Green Cleaning Practices</p>
            </li>
            <li className="mb-2 flex items-center">
              <FaCheck className="mr-4 text-blue-500" />
              <p className='md:text-xl'>Availability and Flexibility</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WhyUsSection
