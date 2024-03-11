import { useEffect, useState } from 'react'
import deepcleaning from '../../assets/deepcleaning.png'
import deepcleaning2 from '../../assets/deepcleaning2.png'
import generalcleaning from '../../assets/generalcleaning.png'
import generalcleaning2 from '../../assets/generalcleaning2.png'
import postconstruction from '../../assets/postconstruction.png'
import postconstruction2 from '../../assets/postconstruction2.png'
import routinecleaning from '../../assets/routinecleaning.png'
import routinecleaning2 from '../../assets/routinecleaning2.png'
import housecleaning from '../../assets/house-cleaning-service.jpeg'
import { PiStarFourFill } from 'react-icons/pi'

const servicesData = [
  {
    name: 'Deep Cleaning',
    image: deepcleaning,
    imageHover: deepcleaning2,
    description:
      'For the deepest and longest lasting clean'
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
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = (index) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(-1)
  }

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.line')
      if (element) {
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
      <div className="bg-[#F9F4EA] md:mt-36 lg:mt-0 md:grid md:grid-cols-2">
          <div className="md:px-4 lg:px-28 mb-10 flex flex-col">
              <p className="flex items-center justify-center md:justify-normal mt-6 md:mt-8 text-xl text-blue-500 md:text-2xl mb-2 font-kaushan">
                our services
                <PiStarFourFill
                size={15}
                className="ml-4 mr-4 text-[#ff8e2c]"
              />
                <span className={`line ${isVisible ? 'animate' : ''}`}></span>
              </p>
              <p className="flex items-center justify-center md:justify-normal text-3xl font-bold text-blue-900 md:text-4xl mb-6">
                What we can offer
              </p>
            <div>
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className="md:flex items-center"
                  onMouseEnter={() => {
                    handleMouseEnter(index)
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="image-container md:my-2">
                    <img
                      src={
                        hoveredIndex === index
                          ? service.imageHover
                          : service.image
                      }
                      alt={service.name}
                      className="md:w-32 md:mr-2 hidden lg:flex"
                    ></img>
                  </div>
                  <div className="mb-10 lg:mb-5">
                    <p className="flex justify-center lg:justify-normal font-semibold hover:underline text-lg md:text-xl">
                      {service.name} &gt;
                    </p>
                    <p className="flex justify-center lg:justify-normal text-gray-500 text-md md:text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        <div className="hidden md:flex">
          <img src={housecleaning} alt="housecleaning" className="h-full aspect-square"></img>
        </div>
      </div>
  )
}

export default ServicesSection
