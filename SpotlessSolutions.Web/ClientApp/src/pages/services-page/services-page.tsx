import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import AddOnServicesCard from '../../components/cards/AddOnServicesCard.tsx'
import CardServices from '../../components/cards/CardServices.tsx'
import FooterV2 from '../../components/footerv2/FooterV2.tsx'
import NavigationBar from '../../components/navigation/NavigationBar'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import { type ServicesDataObject, ServiceType } from '../../types/ServicesDataObject.tsx'

import tdLogo from '../../assets/td_logo.jpg'
import './services-page.scss'

export default function ServicesPage () {
  const notificationsContext = useContext(NotificationsContext)

  const [ready, setReady] = useState(false)
  const [services, setServices] = useState<ServicesDataObject[]>([])

  useEffect(() => {
    async function fetchServices () {
      const request = axios.create({ baseURL: window.location.origin })

      const data = await request
        .get<{ success: true, data: ServicesDataObject[] }>('/api/v1/services/all')
      setServices(data.data.data)
    }

    fetchServices().then(() => {
      setReady(true)
    }).catch(() => {
      notificationsContext.notify(NotificationSeverity.Error, 'Failed to fetch service data')
    })
  }, [])

  return (
    <>
      <NavigationBar />
      {
        ready
          ? (
          <div className="services-container">
            <h1 className="heading-text">
              SERVICES OFFERED
            </h1>

            <div className="services-grid-container">
              {services.filter(x => x.type === ServiceType.Main)
                .map((card, index) => (
                    <CardServices key={index} title={card.name} description={card.description} image={tdLogo}/>
                ))}
            </div>
            <h1 className="heading-text">
              ADDONS SERVICES
            </h1>
            <div className="services-grid-container cols-6-only">
              {services.filter(x => x.type === ServiceType.Addon)
                .map((service, index) => (
                  <AddOnServicesCard key={index} title={service.name} description={service.description}/>
                ))}
            </div>
          </div>
            )
          : (
          <div className="services-container">
            <div className="loading-state">
              <CircularProgress />
            </div>
          </div>
            )
      }
      <FooterV2 />
    </>
  )
}
