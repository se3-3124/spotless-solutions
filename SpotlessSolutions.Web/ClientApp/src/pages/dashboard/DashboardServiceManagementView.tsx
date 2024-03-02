import type { AxiosInstance } from 'axios'
import { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import ServiceEditor from './components/forms/ServiceEditor.tsx'
import { type ServicesDataObject, type ServiceType } from '../../types/ServicesDataObject.tsx'
import ServicesEditingContext from './contexts/ServicesEditingContext.tsx'
import SidebarServiceList from './components/sidebar/SidebarServiceList.tsx'
import { type ServiceDefinitionObject } from '../../types/ServiceDefinitionObject.ts'
import { type ServiceConfigType } from '../../types/ServiceConfigType.ts'
import useSession from "../../hooks/useSession.ts";

interface ActiveViewState {
  id: string
  type: ServiceType
}

export default function DashboardServiceManagementView () {
  const { request } = useSession()
  const notificationsContext = useContext(NotificationsContext)
  
  const [servicesList, setServicesList] = useState<ServicesDataObject[]>([])
  const [activeServiceView, setActiveView] = useState<ActiveViewState | null>(null)
  const [activeServiceDefinitionObject, setActiveServiceDefinitionObject] = useState<ServiceDefinitionObject | null>(null)
  const [viewReady, setViewReady] = useState(false)

  const runServiceListUpdate = () => {
    async function getServices (req: AxiosInstance) {
      const response = await req
        .get<{ success: true, data: ServicesDataObject[] }>('/api/v1/services/all')

      setServicesList(response.data.data)
    }

    getServices(request)
      .catch(() => {
        notificationsContext.notify(NotificationSeverity.Error, 'Failed to fetch servicess list')
      })
  }

  useEffect(() => {
    runServiceListUpdate()
  }, [])

  useEffect(() => {
    if (activeServiceView === null) {
      return
    }

    setViewReady(false)

    async function getServiceDetail (req: AxiosInstance, id: string) {
      const requestUrl = 'api/v1/services/view-details?id=' + id
      const response = await req
        .get<{ success: true, result: ServiceDefinitionObject }>(requestUrl)

      setActiveServiceDefinitionObject(response.data.result)
    }

    getServiceDetail(request, activeServiceView.id)
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

  const updateService = (config: ServiceConfigType) => {
    if (request === null) {
      return
    }

    async function patchService (req: AxiosInstance, config: ServiceConfigType) {
      await req.patch<{ success: boolean }>('/api/v1/services/edit', config)
    }

    patchService(request, config)
      .then(() => {
        runServiceListUpdate()
        notificationsContext.notify(NotificationSeverity.Success, 'Service Updated!')
      })
      .catch(() => {
        notificationsContext.notify(NotificationSeverity.Error, 'Unable to update service')
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
                    ? (
                      <ServiceEditor
                        data={activeServiceDefinitionObject}
                        onSubmit={(e) => { updateService(e) }}
                      />
                      )
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
