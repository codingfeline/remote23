'use client'
//prettier-ignore
import { Link, useAppDispatch, useAppSelector, useEffect, fetchCustomers } from '@components'
import SelectCustomer from '@components/selectCustomer'

export default function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  return (
    <main className="flex flex-col">
      <SelectCustomer />
      <hr />
    </main>
  )
}
