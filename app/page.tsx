'use client'
//prettier-ignore
import { Contact, Device, Link, Method, Server, useAppDispatch, useAppSelector, useEffect, axios } from '@components'
import { Customers as CustType } from '@utils/types/customer'
import { setCustomers } from '@redux/features/customers/customerSlice'

export default function Home() {
  const counter = useAppSelector(state => state.counter.value)
  const customers = useAppSelector(state => state.customer.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://remoteapi.nazs.net/api/customers')
        const customers = response.data
        dispatch(setCustomers(customers))
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <main className="flex flex-col">
      home
      {counter}
      <div className="flex gap-1 flex-wrap">
        {customers.map((cust: CustType) => (
          <Link href={`/customer/${cust._id}`}>{cust.name}</Link>
        ))}
      </div>
      <div className="flex flex-col">
        <h4>Method</h4>
        <div className="flex "></div>
      </div>
    </main>
  )
}
