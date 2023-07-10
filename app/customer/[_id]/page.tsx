'use client'

import { Customers as CustType, contact as ContactType } from '@utils/types/customer'
import {
  useAppSelector,
  useEffect,
  useState,
  axios,
  Contact,
  Show,
  Hide,
} from '@components'

const page = ({ params }: { params: CustType }) => {
  // const customers = useAppSelector(state => state.customer.value)
  // const customer = customers.filter((cust: CustType) => cust._id === params._id)
  // const name = customer.map((cust: CustType) => cust.name)
  // const [customerName, setCustomerName] = useState('')

  const [userPosts, setUserPosts] = useState([])
  const [customer, setCustomer] = useState([])
  const [contact, setContact] = useState<ContactType[]>([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`https://remoteapi.nazs.net/api/customers`)
      const data = await response.json()
      const filteredData = data.filter((c: CustType) => c._id === params._id)[0]
      setCustomer(filteredData)
      setContact(filteredData.contact)
    }

    if (params?._id) fetchPosts()
  }, [params._id])

  return (
    <>
      <div>page</div>
      {params._id} - {customer.length}
      <hr />
      {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(customer, null, 2)}</pre>}
      <hr />
      <hr />
      {contact.map(cont => (
        <Contact name={cont.name} email={cont.email} tel={cont.tel} _id={cont._id} />
      ))}
    </>
  )
}

export default page

// type contact = {
//   _id: string
//   name: string
//   tel: string
//   email: string
// }
