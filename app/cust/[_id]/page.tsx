'use client'
//prettier-ignore
import { ScanFolder, useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers, ScanEmail, useRouter } from '@components'
import CustomerName from '@components/CustomerName'
// import ScanFolder from '@components/scanFolder'
import NetworkConfig from '@components/sections/network'
import RecentViews from '@components/recentViews'
// import SelectCustomer from '@components/selectCustomer'
import SelectCustomer2 from '@components/selectCustomer2'
import { BiHide, BiShow } from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const cust = ({ params }: { params: CustomerType }) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter((cust: CustomerType) => cust._id === params._id)[0]
  const cid = params._id || ''
  const [miniRecent, setMiniRecent] = useState(true)
  const [removeRecent, setRemoveRecent] = useState(false)

  useEffect(() => {
    dispatch(fetchCustomers())
    const nobox = localStorage.getItem('removeRecent')
    nobox === '2' ? setRemoveRecent(true) : setRemoveRecent(false)

    const store = localStorage.getItem('recent')
    if (store) {
      // localStorage.setItem('toggle', '2')
      // localStorage.setItem('removeRecent', '1')
    }
    const tog = localStorage.getItem('toggle')
    tog === '2' ? setMiniRecent(true) : setMiniRecent(false)
  }, [])

  const toggleRecent = () => {
    const toggle = localStorage.getItem('toggle')
    if (toggle === '1') {
      setMiniRecent(true)
      localStorage.setItem('toggle', '2')
    } else {
      localStorage.setItem('toggle', '1')
      setMiniRecent(false)
    }
  }

  const handleBox = () => {
    const remove = localStorage.getItem('removeRecent')
    if (remove === '1') {
      setRemoveRecent(true)
      localStorage.setItem('removeRecent', '2')
    } else {
      setRemoveRecent(false)
      localStorage.setItem('removeRecent', '1')
    }
  }

  const ShowRaw = () => (
    <>
      {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(cust, null, 2)}</pre>}
    </>
  )
  if (!cust) {
    return (
      <div className="error">
        <h5>customer {cid} not found.</h5>
        <button onClick={() => router.push('/')}>home</button>
      </div>
    )
  }
  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <>
      {!removeRecent && (
        <>
          {miniRecent ? (
            <div className="sticky top-0 z-50 flex overflow-y-visible h-3 justify-end">
              <BiShow className="absolute right-2 top-2" onClick={() => toggleRecent()} />
              <RecentViews />
            </div>
          ) : (
            <div className="sticky top-0 z-50 flex overflow-y-visible h-3 justify-end">
              <BiHide className="absolute right-2 top-2" onClick={() => toggleRecent()} />
              <AiOutlineCloseCircle
                className="text-red-400"
                onClick={() => handleBox()}
              />
              <span className="bg-indigo-300 border border-indigo-600 p-2 h-10 flex w-[155px] rounded-md text-indigo-800">
                <h6>Recent Views</h6>
              </span>
            </div>
          )}
        </>
      )}

      <SelectCustomer2 />
      <div className="flex justify-center sticky top-0 mb-1">
        <span className="bg-blue-200 p-3 rounded-l-md border border-blue-300 border-r-0 ">
          <CustomerName id={params._id || ''} />
        </span>
        <span className="bg-blue-100 p-3 rounded-r-md border border-blue-300 border-l-0 select-none">
          {cust.solution}
        </span>
      </div>

      <ShowRaw />
      <Method method={cust.methodInfo} cid={cid} />
      <Contact contact={cust.contact} cid={cid} />
      <Server server={cust.server} cid={cid} />
      <Device device={cust.devicePassword} cid={cid} />
      <ScanEmail scanEmail={cust.scanEmail} cid={cid} />
      <ScanFolder scanFolder={cust.scanFolder} cid={cid} />
      <NetworkConfig network={cust.network} cid={cid} />
      {/* <Setup setup={cust.serverSetup} cid={cid} /> */}
    </>
  )
}

export default cust
