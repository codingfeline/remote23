'use client'

//prettier-ignore
import {  useAppSelector, useEffect, useState, Contact, Show, Hide, Link, CustType, ContactType, MethodType, Method } from '@components'

const page = ({ params }: { params: CustType }) => {
  const customers = useAppSelector(state => state.customer.value)
  const [customer, setCustomer] = useState([])
  const [show, setShow] = useState(false)
  const [contact, setContact] = useState<ContactType[]>([])
  const [method, setMethod] = useState<MethodType[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`https://remoteapi.nazs.net/api/customers`)
      const data = await response.json()
      const filteredData = data.filter((c: CustType) => c._id === params._id)[0]
      setCustomer(filteredData)
      setContact(filteredData.contact)
      setMethod(filteredData.methodInfo)
    }

    if (params?._id) fetchPosts()
  }, [params._id])

  return (
    <>
      <div className="flex gap-1 flex-wrap">
        {customers.map((cust: CustType) => (
          <Link key={cust._id} href={`/customer/${cust._id}`}>
            {cust.name}
          </Link>
        ))}
      </div>
      {params._id} - {customer.length}
      <hr />
      {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(customer, null, 2)}</pre>}
      <hr />
      {method.map(meth => (
        <Method
          key={meth._id}
          methodName={meth.methodName}
          url={meth.url}
          username={meth.username}
          password={meth.password}
          notes={meth.password}
        />
      ))}
      <hr />
      {contact.map(cont => (
        <Contact key={cont._id} name={cont.name} email={cont.email} tel={cont.tel} />
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
