import type { AxiosInstance } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import AuthContext from '../../contexts/AuthContext.ts'
import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import { type ServicesDataObject, ServiceType } from '../../types/ServicesDataObject.tsx'
import ServicesEditingContext from './contexts/ServicesEditingContext.tsx'
import SidebarServiceList from './components/sidebar/SidebarServiceList.tsx'
import { type ServiceDefinitionObject } from '../../types/ServiceDefinitionObject.ts'

interface ActiveViewState {
  id: string
  type: ServiceType
}

export default function DashboardServiceManagementView () {
  const [servicesList, setServicesList] = useState<ServicesDataObject[]>([])
  const [activeServiceView, setActiveView] = useState<ActiveViewState | null>(null)
  const [activeServiceDefinitionObject, setActiveServiceDefinitionObject] = useState<ServiceDefinitionObject | null>(null)
  const [viewReady, setViewReady] = useState(false)

  const authContext = useContext(AuthContext)
  const notificationsContext = useContext(NotificationsContext)
  const navigator = useNavigate()

  useEffect(() => {
    if (authContext.user === null || authContext.request === null) {
      notificationsContext.notify(NotificationSeverity.Error, 'Unauthorized')
      navigator('/')

      return
    }

    async function getServices (req: AxiosInstance) {
      const response = await req
        .get<{ success: true, data: ServicesDataObject[] }>('/api/v1/services/all')

      setServicesList(response.data.data)
    }

    getServices(authContext.request)
      .catch(() => {
        notificationsContext.notify(NotificationSeverity.Error, 'Failed to fetch servicess list')
      })
  }, [])

  useEffect(() => {
    if (activeServiceView === null || authContext.request === null) {
      return
    }

    setViewReady(false)

    async function getServiceDetail (req: AxiosInstance, id: string, type: ServiceType) {
      let baseUrl: string
      switch (type) {
        case ServiceType.Main:
          baseUrl = 'api/v1/services/view-details/service?id=' + id
          break
        case ServiceType.Addon:
          baseUrl = 'api/v1/services/view-details/addon?id=' + id
          break
      }

      const response = await req
        .get<{ success: true, result: ServiceDefinitionObject }>(baseUrl)

      setActiveServiceDefinitionObject(response.data.result)
    }

    getServiceDetail(authContext.request, activeServiceView.id, activeServiceView.type)
      .then(() => {
        setViewReady(true)
      })
      .catch(() => {
        notificationsContext.notify(NotificationSeverity.Error, 'Failed to fetch service definition')
      })
  }, [activeServiceView])

  const selectView = (id: string, type: ServiceType) => {
    const hasId = servicesList.filter(x => x.id === id)
    if (hasId.length <= 0) {
      return
    }

    setActiveView({
      id,
      type
    })
  }

  return (
    <Box sx={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
      <DashboardAppBarComponent />
      <Stack direction="row">
        <DashboardDrawerComponent />
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <ServicesEditingContext.Provider value={{
            services: servicesList,
            onItemSelect: (i, t) => { selectView(i, t) }
          }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <SidebarServiceList />
              </Grid>
              <Grid item xs={8}>
                {
                  viewReady && activeServiceDefinitionObject !== null
                    ? (<p>{activeServiceDefinitionObject.name}</p>)
                    : (
                      <>
                        {
                          activeServiceDefinitionObject === null
                            ? (<div />)
                            : (
                              <Stack alignItems="center" justifyItems="center">
                                <Box sx={{ flexGrow: 1, mt: 2 }}>
                                  <CircularProgress />
                                </Box>
                              </Stack>
                              )
                        }
                      </>
                      )
                }
              </Grid>
            </Grid>
          </ServicesEditingContext.Provider>
        </Box>
      </Stack>
    </Box>
  )
}
