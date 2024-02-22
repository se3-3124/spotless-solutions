import { useContext } from 'react'
import NavigationBar from '../../components/navigation/NavigationBar'
import AuthContext from '../../contexts/AuthContext'
import tdLogo from '../../assets/td_logo.jpg'
import Footer from '../../components/footer/Footer'

const Services2 = () => {
  const context = useContext(AuthContext)

  const cardsData = [
    {
      title: 'Deep Cleaning',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      image: tdLogo
    },
    {
      title: 'Deep Cleaning',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      image: tdLogo
    },
    {
      title: 'Deep Cleaning',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      image: tdLogo
    },
    {
      title: 'Deep Cleaning',
      description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      image: tdLogo
    }
  ]

  const additionalServices = [
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' },
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' }
  ]

  const Card = ({ title, description, image }: { title: string, description: string, image: string }) => {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
          <img className="rounded-t-lg" src={image} alt="TopdownLogo" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            BOOK NOW
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <NavigationBar user={context.user} />
      <div>
        <h1 className='text-5xl font-bold p-8 flex justify-center'>SERVICES OFFERED</h1>
      </div>
      <div className='px-10 grid grid-cols-4 gap-4'>
        {cardsData.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} image={card.image} />
        ))}
      </div>
      <div>
        <h1 className='text-5xl font-bold font-mono p-8 flex justify-center'>ADD ONS SERVICES</h1>
      </div>
      <div className='px-10 grid grid-cols-3 md:grid-cols-6 gap-4'>
        {additionalServices.map((service, index) => (
          <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
            </svg>
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{service.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Services2
