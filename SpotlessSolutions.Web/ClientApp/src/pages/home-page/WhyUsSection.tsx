import { useEffect, useState, useRef } from 'react'

import { PiStarFourFill } from 'react-icons/pi'
import { FaCheck } from 'react-icons/fa'

import peoplecleaning from '../../assets/peoplecleaning.png'

function WhyUsSection () {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

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
    <div className="d89919">
      <div className="u11922" />
      <div>
        <img src={peoplecleaning} alt="People cleaning" className="u44281" />
      </div>
      <div className="u66281">
        <div className="u11921">
          <p className="u44991 font-kaushan">
            why us
            <PiStarFourFill size={15} className="u33201" />
            <span ref={ref} className={`${isVisible && 'animate'}`}></span>
          </p>
          <p className="u77192">
            What set us apart
          </p>
          <ul className="u88912">
            <li>
              <FaCheck className="icon" />
              <p>Reliability and Trustworthiness</p>
            </li>
            <li>
              <FaCheck className="icon" />
              <p>Experience and Expertise</p>
            </li>
            <li>
              <FaCheck className="icon" />
              <p>Customized Services</p>
            </li>
            <li>
              <FaCheck className="icon" />
              <p>Professionalism</p>
            </li>
            <li>
              <FaCheck className="icon" />
              <p>Green Cleaning Practices</p>
            </li>
            <li>
              <FaCheck className="icon" />
              <p>Availability and Flexibility</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WhyUsSection
