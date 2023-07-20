import React from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { fetchCustomers } from './customerSlice'

export const CustomerView = () => {
  const customer = useAppSelector(state => state.customer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])
  return (
    <div>
      <h2>List of Customers</h2>
      {customer.loading && <div>Loading...</div>}
      {!customer.loading && customer.error ? <div>Error: {customer.error}</div> : null}
      {!customer.loading && customer.customers.length ? (
        <ul>
          {customer.customers.map(customer => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
