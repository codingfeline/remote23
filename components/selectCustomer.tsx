'use client'
//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import Select, { OptionTypeBase } from 'react-select'

const SelectCustomer = () => {
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const options: Option[] = customers
    .map(c => {
      return {
        label: c.name + ' (' + c.solution + ')',
        value: c._id,
      }
    })
    .sort((a, b) => {
      let fa = a.label.toLowerCase(),
        fb = b.label.toLowerCase()

      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (!customers.length) {
    return 'Loading...'
  }

  interface Option {
    value: string
    label: string
  }

  const handleChange = (selected: OptionTypeBase<Option> | null) => {
    setSelectedOption(selected)
    if (selected) {
      router.push(`/cust/${selected.value}`)
    }
  }

  return (
    <>
      <Select<Option>
        className="w-1/2 m-auto my-1"
        value={selectedOption}
        options={options}
        onChange={handleChange}
      />
    </>
  )
}

export default SelectCustomer
