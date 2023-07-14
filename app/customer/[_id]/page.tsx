'use client'

//prettier-ignore
import {  useAppSelector, useEffect, useState, Contact, Show, Hide, Link, CustType, ContactType, MethodInfoType, Method, ServerType, Server, DevicePasswordType, Device, ServerSetupType, Setup } from '@components'

const page = ({ params }: { params: CustType }) => {
  const customers = useAppSelector(state => state.customer.value)
  const [customer, setCustomer] = useState<CustType | null>(null)
  const [show, setShow] = useState(false)
  const [showMethod, setshowMethod] = useState(true)
  const [showContact, setshowContact] = useState(true)
  const [showServer, setshowServer] = useState(true)
  const [showDevice, setshowDevice] = useState(true)
  const [showSetup, setshowSetup] = useState(true)
  const [contact, setContact] = useState<ContactType[]>([])
  const [method, setMethod] = useState<MethodInfoType[]>([])
  const [server, setServer] = useState<ServerType[]>([])
  const [devicePassword, setdevicePassword] = useState<DevicePasswordType[]>([])
  const [serverSetup, setServerSetup] = useState<ServerSetupType[]>([])

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
      setServerSetup(filteredData.serverSetup)
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
      {/* METHOD STARTS */}
      <div className="groupMaster group" onClick={() => setshowMethod(prev => !prev)}>
        {showMethod ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub"> Method</span>
      </div>
      <div className={`transIn ${!showMethod && 'transOut'}`}>
        {method.map(meth => (
          <Method
            key={meth._id}
            methodName={meth.methodName}
            url={meth.url}
            notes={meth.notes}
            _id={meth._id}
            username={meth.username}
            password={meth.password}
          />
        ))}
      </div>
      <hr />
      {/* METHOD ENDS  */}
      {/* CONTACT STARTS  */}
      <div className="groupMaster group" onClick={() => setshowContact(prev => !prev)}>
        {showContact ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub"> Contact</span>
      </div>
      <div className={`transIn ${!showContact && 'transOut'}`}>
        {contact.map(cont => (
          <Contact
            key={cont._id}
            name={cont.name}
            email={cont.email}
            tel={cont.tel}
            _id={cont._id}
          />
        ))}
      </div>
      {/* CONTACT ENDS */}
      {/* SERVER STARTS */}
      <div className="groupMaster group" onClick={() => setshowServer(prev => !prev)}>
        {showServer ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Server</span>
      </div>
      <div className={`transIn ${!showServer && 'transOut'}`}>
        {server.map(serv => (
          <Server
            key={serv._id}
            name={serv.name}
            username={serv.username}
            password={serv.password}
            ip={serv.ip}
          />
        ))}
      </div>
      {/* SERVER ENDS */}
      {/* DEVICE STARTS */}
      <div className="groupMaster group" onClick={() => setshowDevice(prev => !prev)}>
        {showDevice ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Device</span>
      </div>
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {devicePassword.map(device => (
          <Device
            key={device._id}
            make={device.make}
            username={device.username}
            password={device.password}
          />
        ))}
      </div>
      {/* DEVICE ENDS */}
      {/* SETUP STARTS */}
      <div className="groupMaster group" onClick={() => setshowSetup(prev => !prev)}>
        {showSetup ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Screenshots</span>
      </div>
      <div className={`transIn ${showSetup && 'transOut'}`}>
        {serverSetup.map(setup => (
          <Setup key={setup._id} comment={setup.comment} screenshot={setup.screenshot} />
        ))}
      </div>
      {/* SETUP ENDS */}
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
