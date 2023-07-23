'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@components'
import { fetchCustomers } from '@redux/features/customer/customerSlice'

const page = () => {
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <>
      <div>customers</div>
      {JSON.stringify(customers[0].contact)}
      {JSON.stringify(customers[0].devicePassword)}
    </>
  )
}

export default page
