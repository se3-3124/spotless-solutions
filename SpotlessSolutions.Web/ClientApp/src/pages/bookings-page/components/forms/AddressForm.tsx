import { type SyntheticEvent, useEffect, useState } from 'react'
import Button from '@mui/material/Button'

import { type AddressResult } from '../../types/AddressResult.ts'
import { type AddressRequest } from '../../types/AddressRequest.ts'

interface AddressFormProps {
  userAddresses: AddressResult[]
  onSelect: (id: string) => void
  onCreate: (values: AddressRequest) => void
}

export default function AddressForm (props: AddressFormProps) {
  const [addresses, setAddresses] = useState<AddressResult[]>([])
  const [selected, setSelected] = useState<string>('select-address')
  const [addressFormValues, setAddressFormValues] = useState<AddressRequest>({
    street: '',
    district: '',
    barangay: '',
    postalCode: '',
    city: '',
    province: ''
  })

  useEffect(() => {
    setAddresses(props.userAddresses)
  }, [props.userAddresses])

  const formValueUpdate = (key: keyof AddressRequest, value: string) => {
    setAddressFormValues(p => ({
      ...p,
      [key]: value
    }))
  }

  const onSelectorChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    setSelected(e.currentTarget.value)
    props.onSelect(e.currentTarget.value)
  }

  const submitAddress = () => {
    props.onCreate(addressFormValues)
  }

  return (
    <>
      <div className="col-span-12 booking-input-container">
        <label htmlFor="address_selector">Select Address</label>
        <select id="address_selector" value={selected} onChange={onSelectorChange}>
          <option value="select-address">Create a new Address</option>
          {
            addresses.map((x, i) => (
              <option key={i} value={x.id}>
                {x.street}, {x.barangay}, {x.district}, {x.city}, {x.province}, {x.postalCode}
              </option>
            ))
          }
        </select>
      </div>
      {
        selected === 'select-address' && [
          {
            id: 'street',
            clsx: 'col-span-12',
            label: 'Street Address'
          },
          {
            id: 'barangay',
            clsx: 'col-span-6',
            label: 'Barangay'
          },
          {
            id: 'district',
            clsx: 'col-span-6',
            label: 'District'
          },
          {
            id: 'city',
            clsx: 'col-span-6',
            label: 'City/Municipality'
          },
          {
            id: 'province',
            clsx: 'col-span-6',
            label: 'Province'
          },
          {
            id: 'postalCode',
            clsx: 'col-span-12',
            label: 'Zip Code'
          }
        ].map((x, i) => (
          <div key={i} className={`${x.clsx} booking-input-container`}>
            <label htmlFor={x.id}>{x.label}</label>
            <input
              id={x.id}
              type="text"
              placeholder={x.label}
              className="text-field-lmfao"
              onChange={(e) => {
                formValueUpdate(x.id as keyof AddressRequest, e.target.value)
              }}
              value={addressFormValues[x.id as keyof AddressRequest]}
              required
            />
          </div>
        ))
      }
      {
        selected === 'select-address' && (
          <div className="col-span-12">
            <Button variant="contained" onClick={submitAddress}>Create Entry</Button>
          </div>
        )
      }
    </>
  )
}
