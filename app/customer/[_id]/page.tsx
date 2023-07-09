'use client'

import { Customers as CustType } from '@utils/types/customer'
import { useAppSelector, useEffect, useState, axios } from '@components'

const page = ({ params }: { params: CustType }) => {
  const customers = useAppSelector(state => state.customer.value)
  const customer = customers.filter((cust: CustType) => cust._id === params._id)
  const name = customer.map((cust: CustType) => cust.name)
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://remoteapi.nazs.net/api/customers')
      // const data = await response.json()
      const customer = response.data.filter((cust: CustType) => cust._id === params._id)
      // setCustomerName(customer.name)
    }

    if (params?._id) fetchPosts()
  }, [params._id])

  return (
    <>
      <div>page</div>
      {params._id}
      <hr />
      {/* {JSON.stringify(customer)} */}
      <hr />
      {/* {JSON.stringify(customers)} */}
      {customer.map((cust: CustType) => (
        <h5>{cust.name}</h5>
      ))}
      <hr />
      {JSON.stringify(customerName)}
    </>
  )
}

export default page
