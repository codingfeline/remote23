'use client'

//prettier-ignore
import {  useAppSelector, useEffect, useState, Contact, Show, Hide, Link, CustType, ContactType, MethodInfoType, Method, ServerType, Server, DevicePasswordType, Device } from '@components'

const page = ({ params }: { params: CustType }) => {
  const customers = useAppSelector(state => state.customer.value)
  const [customer, setCustomer] = useState<CustType | null>(null)
  const [show, setShow] = useState(false)
  const [showContact, setshowContact] = useState(true)
  const [showServer, setshowServer] = useState(true)
  const [contact, setContact] = useState<ContactType[]>([])
  const [method, setMethod] = useState<MethodInfoType[]>([])
  const [server, setServer] = useState<ServerType[]>([])
  const [devicePassword, setdevicePassword] = useState<DevicePasswordType[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`https://remoteapi.nazs.net/api/customers`)
      const data = await response.json()
      const filteredData = data.filter((c: CustType) => c._id === params._id)[0]
      setCustomer(filteredData)
      setContact(filteredData.contact)
      setMethod(filteredData.methodInfo)
      setServer(filteredData.server)
      setdevicePassword(filteredData.devicePassword)
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
      {params._id} - {customer?.name}
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
          notes={meth.notes}
          _id={meth._id}
        />
      ))}
      <hr />
      {showContact ? (
        <>
          <div className="showItem group" onClick={() => setshowContact(prev => !prev)}>
            <Hide />
            <span> Contact</span>
          </div>
          {contact.map(cont => (
            <Contact
              key={cont._id}
              name={cont.name}
              email={cont.email}
              tel={cont.tel}
              _id={cont._id}
            />
          ))}
        </>
      ) : (
        <div className="showItem" onClick={() => setshowContact(prev => !prev)}>
          <Show />
          <span> Contact</span>
        </div>
      )}
      {showServer ? (
        <>
          <Hide onClick={() => setshowServer(prev => !prev)} />
          {server.map(serv => (
            <Server
              key={serv._id}
              name={serv.name}
              username={serv.username}
              password={serv.password}
              ip={serv.ip}
            />
          ))}
        </>
      ) : (
        <Show onClick={() => setshowServer(prev => !prev)} />
      )}
      {devicePassword.map(device => (
        <Device
          key={device._id}
          make={device.make}
          username={device.username}
          password={device.password}
        />
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
