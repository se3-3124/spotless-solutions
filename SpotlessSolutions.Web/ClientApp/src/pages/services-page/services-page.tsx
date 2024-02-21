import { useContext } from 'react'

import AddOnServicesCard from '../../components/cards/AddOnServicesCard.tsx'
import AuthContext from '../../contexts/AuthContext'
import CardServices from '../../components/cards/CardServices.tsx'
import FooterV2 from '../../components/footerv2/FooterV2.tsx'
import NavigationBar from '../../components/navigation/NavigationBar'

import tdLogo from '../../assets/td_logo.jpg'
import './services-page.scss'

export default function ServicesPage () {
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
    { title: 'Mattress Cleaning', description: 'Go to this step by step guideline process on how to certify for your weekly benefits.' }
  ]

  return (
    <>
      <NavigationBar user={context.user} />
      <div className="services-container">
        <h1 className="heading-text">
          SERVICES OFFERED
        </h1>

        <div className="services-grid-container">
          {cardsData.map((card, index) => (
            <CardServices key={index} title={card.title} description={card.description} image={card.image}/>
          ))}
        </div>
        <h1 className="heading-text">
          ADDONS SERVICES
        </h1>
        <div className="services-grid-container cols-6-only">
          {additionalServices.map((service, index) => (
            <AddOnServicesCard key={index} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
      <FooterV2 />
    </>
  )
}
