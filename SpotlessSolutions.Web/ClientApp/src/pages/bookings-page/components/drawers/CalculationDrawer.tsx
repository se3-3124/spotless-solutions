import { type AxiosInstance } from 'axios'
import { useContext, useEffect, useState } from 'react'

import AuthContext from '../../../../contexts/AuthContext.ts'
import { type CalculationItemResult } from '../../types/CalculationItemResult.ts'
import { type SelectedServicesType, type ServiceConfigurationType } from '../../types/BookingsPageStateTypes.ts'

import './CalculationDrawer.styles.scss'

interface CalculationDrawerProps {
  selectedServices: SelectedServicesType
  serviceConfiguration: ServiceConfigurationType
}

interface CalculationResultState {
  result: CalculationItemResult[]
  total: number
}

export default function CalculationDrawer ({ selectedServices, serviceConfiguration }: CalculationDrawerProps) {
  const authContext = useContext(AuthContext)
  const [calculationResult, setCalculationResult] = useState<CalculationResultState>({
    result: [],
    total: 0
  })

  useEffect(() => {
    if (authContext.request === null) {
      return
    }

    const body: Record<string, string> = {}

    const onlyActiveServices: string[] = Object.keys(serviceConfiguration.services)
      .filter(x => selectedServices.addOns[x])
    if (selectedServices.mainService !== null) {
      onlyActiveServices.push(selectedServices.mainService)
    }

    for (const key of onlyActiveServices) {
      const values = serviceConfiguration.services[key]
      if (values === undefined || values === null) {
        continue
      }

      const bodyValues: Record<string, string | number> = {
        area: serviceConfiguration.area <= 0 ? 1 : serviceConfiguration.area
      }
      for (const _key of Object.keys(values)) {
        bodyValues[_key] = values[_key].value
      }

      body[key] = JSON.stringify(bodyValues)
    }

    async function callCalculator (req: AxiosInstance) {
      const result = await req
        .post<{ success: true, items: CalculationItemResult[], totalPrice: number }>('/api/v1/services/calculator', {
        items: body
      })
      return {
        items: result.data.items,
        total: result.data.totalPrice
      }
    }

    // Don't make a request when its empty lmfao
    if (Object.keys(body).length <= 0) {
      return
    }

    callCalculator(authContext.request)
      .then(r => {
        setCalculationResult({
          result: r.items,
          total: r.total
        })
      })
      .catch(console.error)
  }, [selectedServices, serviceConfiguration])

  return (
    <div role="presentation" className="bookings-drawer-root">
      <h1 className="drawer-heading">Checkout Details</h1>
      {
        calculationResult.result.map((x, i) => (
          <div key={i} className="drawer-section">
            <h1 className="section-heading">{x.name}</h1>
            {
              x.descriptors.map((y, j) => (
                <div key={j} className="section-group">
                  <p className="left-heading-text">{y[0]}</p>
                  {
                    y[1] !== undefined && (
                      <p className="right-value">{y[1]}</p>
                    )
                  }
                </div>
              ))
            }
            {
              x.requiresAssessment && (
                <div className="section-group">
                  <p className="left-heading-text">
                    *This service price is not calculated because it requires assessment
                  </p>
                </div>
              )
            }
          </div>
        ))
      }
      <div className="drawer-flex-separator"/>
      <div className="grand-total">
        <h1 className="left-heading-text">Grand Total</h1>
        <p className="right-value">P{calculationResult.total}</p>
      </div>
      <div className="grand-total subtle">
        <h1 className="left-heading-text">20% Down-payment</h1>
        <p className="right-value">P{(calculationResult.total * 0.20).toFixed(2)}</p>
      </div>
      <div className="btn-book-now">
        Book Now
      </div>
    </div>
  )
}
