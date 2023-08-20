'use client'
//prettier-ignore
import { Link, useAppDispatch, useAppSelector, useEffect, fetchCustomers } from '@components'
import RecentViews from '@components/recentViews'
// import SelectCustomer from '@components/selectCustomer'
import SelectCustomer2 from '@components/selectCustomer2'

export default function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  return (
    <main className="flex flex-col">
      <SelectCustomer2 />
      <RecentViews />
    </main>
  )
}
