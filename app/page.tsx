'use client'
//prettier-ignore
import { Link, useAppDispatch, useAppSelector, useEffect, fetchCustomers } from '@components'

export default function Home() {
  const dispatch = useAppDispatch()
  const counter = useAppSelector(state => state.counter.value)
  const customers = useAppSelector(state => state.customer.customers)
  const customer = customers[0]

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  return (
    <main className="flex flex-col">
      home
      {/* {JSON.stringify(customer)} -- filtered */}
      {counter}
      {/* <div className="flex gap-1 flex-wrap">
        {customers.map((cust: CustType) => (
          <Link href={`/customer/${cust._id}`}>{cust.name}</Link>
        ))}
      </div> */}
      <div className="flex gap-1 flex-wrap">
        {customers.map(cust => (
          <Link key={cust._id} href={`/cust/${cust._id}`}>
            {cust.name}
          </Link>
        ))}
      </div>
      <hr />
    </main>
  )
}
