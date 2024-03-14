import { useEffect, useState, useRef } from 'react'

import { PiStarFourFill } from 'react-icons/pi'

import deepcleaning from '../../assets/deepcleaning.png'
import deepcleaning2 from '../../assets/deepcleaning2.png'
import generalcleaning from '../../assets/generalcleaning.png'
import generalcleaning2 from '../../assets/generalcleaning2.png'
import postconstruction from '../../assets/postconstruction.png'
import postconstruction2 from '../../assets/postconstruction2.png'
import routinecleaning from '../../assets/routinecleaning.png'
import routinecleaning2 from '../../assets/routinecleaning2.png'
import housecleaning from '../../assets/house-cleaning-service.jpeg'

const servicesData = [
  {
    name: 'Deep Cleaning',
    image: deepcleaning,
    imageHover: deepcleaning2,
    description: 'For the deepest and longest lasting clean'
  },
  {
    name: 'General Cleaning',
    image: generalcleaning,
    imageHover: generalcleaning2,
    description: 'A quick clean that is best for small areas'
  },
  {
    name: 'Post Construction Cleaning',
    image: postconstruction,
    imageHover: postconstruction2,
    description: 'For newly constructed or renovated homes'
  },
  {
    name: 'Routine Cleaning',
    image: routinecleaning,
    imageHover: routinecleaning2,
    description: 'Follow-up cleaning that can be done on regular basis'
  }
]

function ServicesSection () {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(-1)
  }

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
    <div className="d99102">
      <div className="d00192">
        <p className="p92812 font-kaushan">
          our services
          <PiStarFourFill size={15} className="i82712" />
          <span ref={ref} className={`line ${isVisible && 'animate'}`} />
        </p>
        <p className="p91244">
          What we can offer
        </p>
        <div className="d82111">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="d82912"
              onMouseEnter={() => {
                handleMouseEnter(index)
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="image-container">
                <img
                  src={
                    hoveredIndex === index ? service.imageHover : service.image
                  }
                  alt={service.name} />
              </div>
              <div className="d91824">
                <p className="p66127">
                  {service.name} &gt;
                </p>
                <p className="p88273">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d00124">
        <img
          src={housecleaning}
          alt="housecleaning"
          className="h-full aspect-square" />
      </div>
    </div>
  )
}

export default ServicesSection
