'use client'

//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustType, ContactType, MethodInfoType, Method, ServerType, Server, DevicePasswordType, Device, ServerSetupType, Setup } from '@components'

const page = ({ params }: { params: CustType }) => {
  const url = 'https://remoteapi.nazs.net/api/customers'
  const customers = useAppSelector(state => state.customer.value)
  const copy = useAppSelector(state => state.copy.value)

  const [customer, setCustomer] = useState<CustType | null>(null)
  const [show, setShow] = useState(false)

  const [contact, setContact] = useState<ContactType[]>([])
  const [method, setMethod] = useState<MethodInfoType[]>([])
  const [server, setServer] = useState<ServerType[]>([])
  const [devicePassword, setdevicePassword] = useState<DevicePasswordType[]>([])
  const [serverSetup, setServerSetup] = useState<ServerSetupType[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(url)
      const data = await response.json()
      const filteredData = data.filter((c: CustType) => c._id === params._id)[0]
      setCustomer(filteredData)
      setContact(filteredData.contact)
      setMethod(filteredData.methodInfo)
      setServer(filteredData.server)
      setdevicePassword(filteredData.devicePassword)
      setServerSetup(filteredData.serverSetup)
    }

    if (params?._id) fetchPosts()
  }, [params._id])

  return (
    <>
      {/* DISPLAY COPIED CLIPBOARD */}
      <span className={`transition-opacity ${copy ? 'opacity-1' : ' opacity-0'}`}>
        {copy && (
          <>
            Copied <i>{copy}</i>
          </>
        )}
      </span>
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
      <Method method={method} />
      <Contact contact={contact} />
      <Server server={server} />
      <Device device={devicePassword} />
      <Setup setup={serverSetup} />
    </>
  )
}

export default page
