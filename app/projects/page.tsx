import { Customers } from '@utils/types/customer'
import axios from 'axios'

const projects = async () => {
  const customers = await getCustomers()
  return (
    <>
      <div>projects</div>
      {customers.length
        ? customers.map((cust: Customers) => <h5>{cust._id}</h5>)
        : 'unable to fetch customers'}

      {/* {JSON.stringify(customers)} */}
    </>
  )
}

export default projects

const getCustomers = async () => {
  try {
    const response = await axios.get('https://remoteapi.nazs.net/api/customers')
    return response.data
    // dispatch(setCustomers(customers))
  } catch (error) {
    return error
    // console.error('Error fetching customers:', error)
  }

  // try {
  //   const res = await fetch('https://remoteapi.nazs.net/api/customers')
  //   return res.json()
  // } catch (error) {
  //   return error
  // }
  // if (!res.ok) {
  //   throw new Error('Failed to fetch')
  // }
  // return res.json()

  // if (!res.ok) {
  // }
}

// type Customers = {
//   _id: number
// }
