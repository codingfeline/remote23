'use client'
//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import { OptionTypeBase } from 'react-select'
// import Select from 'react-select/async';
// import OptionTypeBase from 'react-select'

const SelectCustomer2 = () => {
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState()

  const options = customers
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
  }, [selectedOption])

  if (!customers.length) {
    return 'Loading...'
  }

  const handleChange = selected => {
    const store = localStorage.getItem('recent')
    if (store) {
      const newCust = { label: selected.label, value: selected.value }
      const curr = JSON.parse(store)

      const exists = curr.find(item => item.value === newCust.value)

      if (exists) {
        //remove the item from current list
        const newArr = curr.filter(item => item.value !== newCust.value)
        // add the item to the top of the list
        newArr.unshift(newCust)
        localStorage.setItem('recent', JSON.stringify(newArr))
      } else {
        curr.unshift(newCust)
        localStorage.setItem('recent', JSON.stringify(curr))
      }
    } else {
      const arr = []
      const newCust = { label: selected.label, value: selected.value }
      arr.push(newCust)
      localStorage.setItem('recent', JSON.stringify(arr))
    }

    setSelectedOption(selected)
    if (selected) {
      router.push(`/cust/${selected.value}`)
    }
  }

  return (
    <>
      <Select
        className="w-1/3 m-auto my-1 z-10"
        value={selectedOption}
        options={options}
        onChange={handleChange}
      />
    </>
  )
}

export default SelectCustomer2
