import { type AxiosInstance } from 'axios'
import { DateTime } from 'luxon'
import { type ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccordionComponent from './components/AccordionComponent.tsx'
import AddressForm from './components/forms/AddressForm.tsx'
import { type AddressRequest } from './types/AddressRequest.ts'
import { type AddressResult } from './types/AddressResult.ts'
import { type AppointmentRequest } from './types/AppointmentRequest.ts'
import AuthContext from '../../contexts/AuthContext.ts'
import CalculationDrawer from './components/drawers/CalculationDrawer.tsx'
import FooterV2 from '../../components/footerv2/FooterV2.tsx'
import GenericDatePickerField from './components/inputs/GenericDatePickerField.tsx'
import GenericTimePickerField from './components/inputs/GenericTimePickerField.tsx'
import InputFieldFactoryComponent from './components/inputs/InputFieldFactoryComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'
import NotificationsContext, { NotificationSeverity } from '../../contexts/NotificationsContext.tsx'
import {
  type OptionalCalculationObjectType,
  type OrganizedServicesType,
  type SelectedServicesType,
  type ServiceConfigurationType,
  type ServiceFields
} from './types/BookingsPageStateTypes.ts'
import { type ServicesDataObject, ServiceType } from '../../types/ServicesDataObject.tsx'
import { ServiceInputFieldTypes } from './types/ServiceInputFieldTypes.ts'
import { type ServiceInputFieldObjectType } from './types/ServiceInputFieldObjectType.ts'
import ServiceObjectComponent from './components/ServiceObjectComponent.tsx'

import './BookingsPage.styles.scss'

export default function BookingsPage () {
  const authContext = useContext(AuthContext)
  const notificationContext = useContext(NotificationsContext)
  const navigate = useNavigate()

  const [userAddresses, setUserAddresses] = useState<AddressResult[]>([])
  const [services, setServices] = useState<OrganizedServicesType>({
    mainServices: [],
    addOns: []
  })
  const [selectedServices, setSelectedServices] = useState<SelectedServicesType>({
    mainService: null,
    addOns: {}
  })
  const [schedule, setSchedule] = useState<DateTime>(DateTime.now())
  const [serviceConfiguration, setServiceConfiguration] = useState<ServiceConfigurationType>({
    area: 1,
    runEstimator: false,
    addressId: '',
    optionalValues: {
      bedroom: {
        id: 'bedroom_field',
        label: 'Bedroom Count',
        count: 0
      },
      comfortRoom: {
        id: 'cr_field',
        label: 'Comfort Room Count',
        count: 0
      },
      kitchen: {
        id: 'kitchen_field',
        label: 'Kitchen Count',
        count: 0
      },
      storageArea: {
        id: 'storage_area_field',
        label: 'Storage Area Count',
        count: 0
      },
      livingRoom: {
        id: 'living_room_field',
        label: 'Living Room Count',
        count: 0
      },
      floors: {
        id: 'floor_field',
        label: 'Floors',
        count: 0
      }
    },
    services: {}
  })

  const getAddresses = async (req: AxiosInstance) => {
    const response = await req
      .get<{ success: true, result: AddressResult[] }>('/api/v1/user/address/all')
    setUserAddresses(response.data.result)
  }

  useEffect(() => {
    if (authContext.user === null || authContext.request === null) {
      notificationContext.notify(NotificationSeverity.Error, 'You are not signed in!')
      navigate('/login')
      return
    }

    async function fetchAllServices (req: AxiosInstance) {
      const result = await req
        .get<{ success: true, data: ServicesDataObject[] }>('/api/v1/services/all')
      return result.data.data
    }

    fetchAllServices(authContext.request)
      .then(r => {
        setServices({
          mainServices: r.filter(x => x.type === ServiceType.Main),
          addOns: r.filter(x => x.type === ServiceType.Addon)
        })
      })
      .catch(() => {
        notificationContext.notify(NotificationSeverity.Error, 'Unable to fetch services.')
      })

    getAddresses(authContext.request).catch(() => {
      notificationContext.notify(NotificationSeverity.Error, 'Unable to fetch addresses.')
    })
  }, [])

  const triggerFormCaching = (id: string) => {
    async function trigger (req: AxiosInstance, serviceId: string) {
      const result = await req
        .get<{ success: true, result: ServiceInputFieldObjectType[] }>(`/api/v1/bookings/fields?serviceId=${serviceId}`)
      return result.data.result
    }

    if (authContext.request === null) {
      return
    }

    if (serviceConfiguration.services[id] === undefined || serviceConfiguration.services[id] === null) {
      trigger(authContext.request, id)
        .then(d => {
          setServiceConfiguration(s => {
            const serviceConfig: Record<string, ServiceFields> = {}
            for (const item of d) {
              serviceConfig[item.configId] = {
                fieldMetadata: item,
                value: 1
              }

              // Set defaults
              if (item.type === ServiceInputFieldTypes.Select) {
                const firstValue = item.supportedValues[0][0]
                serviceConfig[item.configId].value = Number(firstValue)
              }

              if (item.type === ServiceInputFieldTypes.InputDate) {
                serviceConfig[item.configId].value = new Date().toISOString()
              }

              if (item.type === ServiceInputFieldTypes.InputTextBox || item.type === ServiceInputFieldTypes.FileUpload) {
                serviceConfig[item.configId].value = ''
              }
            }

            return {
              ...s,
              services: {
                ...s.services,
                [id]: serviceConfig
              }
            }
          })
        })
        .catch(console.error)
    }
  }

  const handleMainServiceCheckbox = (id: string) => {
    setSelectedServices(r => ({
      ...r,
      mainService: r.mainService === id ? null : id
    }))

    triggerFormCaching(id)
  }

  const handleAddonServiceCheckbox = (id: string) => {
    setSelectedServices(r => ({
      ...r,
      addOns: {
        ...r.addOns,
        [id]: !r.addOns[id]
      }
    }))

    triggerFormCaching(id)
  }

  const handleServiceFieldUpdates = (serviceId: string, configKey: string, value: string | number) => {
    setServiceConfiguration(d => ({
      ...d,
      services: {
        ...d.services,
        [serviceId]: {
          ...d.services[serviceId],
          [configKey]: {
            ...d.services[serviceId][configKey],
            value
          }
        }
      }
    }))
  }

  const handleAreaSizeChange = (value: number) => {
    if (isNaN(value) || value < 1) {
      return
    }
    setServiceConfiguration(d => ({ ...d, area: value }))
  }

  const recalculateOptionalValues = (target: keyof OptionalCalculationObjectType, value: number) => {
    if (value < 0 || (target === 'floors' && value <= 0) || isNaN(value)) {
      return
    }

    setServiceConfiguration(d => {
      const values = { ...d }
      values.optionalValues[target].count = value

      // Recalculate
      values.area = [
        values.optionalValues.bedroom.count * 10,
        values.optionalValues.comfortRoom.count * 6,
        values.optionalValues.kitchen.count * 20,
        values.optionalValues.livingRoom.count * 20,
        values.optionalValues.storageArea.count * 15
      ].reduce((a, b) => a + b) * values.optionalValues.floors.count

      return values
    })
  }

  const toggleEstimator = () => {
    setServiceConfiguration(t => ({ ...t, runEstimator: !t.runEstimator }))
  }

  const onAddressSelect = (id: string) => {
    setServiceConfiguration(p => ({
      ...p,
      addressId: id
    }))
  }

  const onAddressCreate = (config: AddressRequest) => {
    async function requestor (req: AxiosInstance, config: AddressRequest) {
      await req.post<{ success: true }>('/api/v1/user/address/create', config)
    }

    const req = authContext.request
    if (req !== null) {
      requestor(req, config)
        .then(function () {
          notificationContext.notify(NotificationSeverity.Success, 'Entry Added!')
          getAddresses(req).catch(() => console.error)
        })
        .catch(() => { notificationContext.notify(NotificationSeverity.Error, 'Unable to add entry.') })
    }
  }

  const changeDateSchedule = (date: DateTime) => {
    setSchedule(p => {
      return p
        .set({ year: date.year, month: date.month, day: date.day })
    })
  }

  const changeTimeSchedule = (date: DateTime) => {
    setSchedule(p => {
      return p
        .set({ hour: date.hour, minute: date.minute })
    })
  }

  const getConfigrationValueOf = (id: string): string => {
    const service: string[] = Object.keys(serviceConfiguration.services)
      .filter(x => x === id)
    if (service[0] === undefined) {
      return ''
    }

    const values = serviceConfiguration.services[id]
    if (values === undefined || values === null) {
      return ''
    }

    const bodyValues: Record<string, string | number> = {
      area: serviceConfiguration.area <= 0 ? 1 : serviceConfiguration.area
    }
    for (const _key of Object.keys(values)) {
      bodyValues[_key] = values[_key].value
    }

    return JSON.stringify(bodyValues)
  }

  const bookAppointment = () => {
    async function runBooker (req: AxiosInstance, appointment: AppointmentRequest) {
      await req.post('/api/v1/bookings/appointment', appointment)
    }

    const stringSchedule = schedule.toISO()
    const selectedMainService = selectedServices.mainService
    if (authContext.request === null || stringSchedule === null || selectedMainService === null) {
      return
    }

    const appointmentDetails: AppointmentRequest = {
      schedule: stringSchedule,
      addressId: serviceConfiguration.addressId,
      mainServiceId: selectedMainService,
      mainServiceConfig: getConfigrationValueOf(selectedMainService),
      addons: {}
    }

    const activeAddons = Object.keys(serviceConfiguration.services)
      .filter(x => selectedServices.addOns[x])
    for (const key of activeAddons) {
      appointmentDetails.addons[key] = getConfigrationValueOf(key)
    }

    runBooker(authContext.request, appointmentDetails)
      .then(() => {
        notificationContext.notify(NotificationSeverity.Success, 'Booking successful!')
      })
      .catch(() => {
        notificationContext.notify(NotificationSeverity.Error, 'Unable to book due to an exception.')
      })
  }

  return (
    <>
      <NavigationBar user={authContext.user} />
      <div className="bookings-page-wrapper">
        <div className="bookings-grid-container">
          <div className="bookings-form-container">
            <h1 className="booking-page-heading">Schedule a Cleaning Service</h1>

            {/* Main Service Selection */}
            <AccordionComponent title="Select a Main Service" defaultActive={true}>
              <div className="booking-service-grid-container">
                {
                  services.mainServices.map((x, i) => (
                    <ServiceObjectComponent
                      key={i}
                      name={x.name}
                      description={x.description}
                      onClick={() => { handleMainServiceCheckbox(x.id) }}
                      controlled={true}
                      checked={selectedServices.mainService === x.id}
                      disabled={selectedServices.mainService !== x.id && selectedServices.mainService !== null}
                    />
                  ))
                }
              </div>
            </AccordionComponent>

            {/* Addon Selection */}
            <AccordionComponent title="Select Addons">
              <div className="booking-service-grid-container">
                {
                  services.addOns.map((x, i) => (
                    <ServiceObjectComponent
                      key={i}
                      name={x.name}
                      description={x.description}
                      onClick={() => { handleAddonServiceCheckbox(x.id) }}
                      controlled={true}
                      checked={Boolean(selectedServices.addOns[x.id])}
                    />
                  ))
                }
              </div>
            </AccordionComponent>

            {/* Details */}
            <AccordionComponent title="Provide Details">
              <div className="fields-grid-container">

                {/* Specify Area Size Section */}
                <div className="col-span-12">
                  <h1 className="section-title">Your Place</h1>
                </div>
                <AddressForm
                  userAddresses={userAddresses}
                  onSelect={onAddressSelect}
                  onCreate={onAddressCreate}
                />
                <div className="col-span-12 booking-input-container">
                  <label htmlFor="area_size">Area</label>
                  <input
                    disabled={serviceConfiguration.runEstimator}
                    type="number"
                    value={serviceConfiguration.area}
                    placeholder="Area Size"
                    style={{ marginBottom: '0.75em' }}
                    min="1"
                    onChange={(e) => { handleAreaSizeChange(Number(e.target.value)) }}
                  />
                  <div className="checkbox-container">
                    <div className="checkbox">
                      <input
                        id="use-estimator"
                        type="checkbox"
                        value={serviceConfiguration.runEstimator ? 'yes' : ''}
                        onChange={toggleEstimator}
                      />
                    </div>
                    <label htmlFor="use-estimator">I don&apos;t know the area of the place</label>
                  </div>
                </div>
                {
                  serviceConfiguration.runEstimator && Object.keys(serviceConfiguration.optionalValues).map((k, i) => {
                    const key = k as keyof OptionalCalculationObjectType
                    return (
                      <div key={i} className="col-span-6 booking-input-container">
                        <label htmlFor={serviceConfiguration.optionalValues[key].id}>
                          {serviceConfiguration.optionalValues[key].label}
                        </label>
                        <input
                          type="number"
                          placeholder={serviceConfiguration.optionalValues[key].label}
                          value={serviceConfiguration.optionalValues[key].count}
                          onChange={(e) => {
                            recalculateOptionalValues(key, Number(e.target.value))
                          }}
                        />
                      </div>
                    )
                  })
                }
              </div>

              {/* Autogenerated sections according to services booked */}
              {
                selectedServices.mainService !== null
                  ? (function (): ReactNode {
                      const k = services.mainServices
                        .filter(x => x.id === selectedServices.mainService)[0]
                      return (
                        <div className="fields-grid-container mt-5">
                          <div className="col-span-12">
                            <h1 className="section-title">{k.name}</h1>
                          </div>
                          {
                            serviceConfiguration.services[k.id] !== null && serviceConfiguration.services[k.id] !== undefined
                              ? Object.keys(serviceConfiguration.services[k.id]).map((c, i) => {
                                return (
                                  <InputFieldFactoryComponent
                                    key={i}
                                    object={serviceConfiguration.services[k.id][c].fieldMetadata}
                                    onChange={(ky, v) => { handleServiceFieldUpdates(k.id, ky, v) } }
                                    value={serviceConfiguration.services[k.id][c].value}
                                  />
                                )
                              })
                              : (
                                  <div className="col-span-12">
                                    <p>Loading configuration...</p>
                                  </div>
                                )
                          }
                        </div>
                      )
                    })()
                  : (<></>)
              }
              {
                Object.keys(selectedServices.addOns)
                  .filter(k => selectedServices.addOns[k])
                  .map((k, i) => {
                    const service = services.addOns.filter(x => x.id === k)
                    if (service.length <= 0) {
                      return (<div key={i} />)
                    }

                    const o = service[0]

                    return (
                      <div key={i} className="fields-grid-container mt-5">
                        <div className="col-span-12">
                          <h1 className="section-title">{o.name}</h1>
                        </div>
                        {
                          serviceConfiguration.services[o.id] !== null && serviceConfiguration.services[o.id] !== undefined
                            ? Object.keys(serviceConfiguration.services[o.id]).map((c, j) => {
                              return (
                                <InputFieldFactoryComponent
                                  key={j}
                                  object={serviceConfiguration.services[o.id][c].fieldMetadata}
                                  onChange={(ky, v) => { handleServiceFieldUpdates(o.id, ky, v) } }
                                  value={serviceConfiguration.services[o.id][c].value}
                                />
                              )
                            })
                            : (
                                <div className="col-span-12">
                                  <p>Loading configuration...</p>
                                </div>
                              )
                        }
                      </div>
                    )
                  })
              }
            </AccordionComponent>

            {/* Schedule */}
            <AccordionComponent title="Select Schedule">
              <div className="fields-grid-container">
                <div className="col-span-6">
                  <GenericDatePickerField
                    onChange={changeDateSchedule}
                    value={schedule}
                  />
                </div>
                <div className="col-span-6">
                  <GenericTimePickerField
                    onChange={changeTimeSchedule}
                    value={schedule}
                  />
                </div>
              </div>
            </AccordionComponent>
          </div>
          <div className="bookings-sidebar-container">
            <CalculationDrawer
              selectedServices={selectedServices}
              serviceConfiguration={serviceConfiguration}
              bookEvent={bookAppointment}
            />
          </div>
        </div>
      </div>
      <FooterV2 />
    </>
  )
}
