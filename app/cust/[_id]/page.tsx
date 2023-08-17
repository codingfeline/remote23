'use client'
//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers } from '@components'
import CustomerName from '@components/CustomerName'
import NetworkConfig from '@components/network'
import RecentViews from '@components/recentViews'
import SelectCustomer from '@components/selectCustomer'
import { BiHide, BiShow } from 'react-icons/bi'

const cust = ({ params }: { params: CustomerType }) => {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter((cust: CustomerType) => cust._id === params._id)[0]
  const cid = params._id || ''
  const [showBox, setShowBox] = useState(true)

  useEffect(() => {
    dispatch(fetchCustomers())
    const tog = localStorage.getItem('toggle')
    tog === '2' ? setShowBox(true) : setShowBox(false)
  }, [])

  const toggleRecent = () => {
    const recent = localStorage.getItem('toggle')
    if (recent === '1') {
      setShowBox(true)
      localStorage.setItem('toggle', '2')
    } else {
      localStorage.setItem('toggle', '1')
      setShowBox(false)
    }
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <>
      {showBox ? (
        <div className="sticky top-0 z-50 flex overflow-y-visible h-3 justify-end">
          <BiShow className="absolute right-2 top-2" onClick={() => toggleRecent()} />
          <RecentViews />
        </div>
      ) : (
        <div className="sticky top-0 z-50 flex overflow-y-visible h-3 justify-end">
          <BiHide className="absolute right-2 top-2" onClick={() => toggleRecent()} />
          <span className="bg-indigo-300 border border-indigo-600 p-2 h-10 flex w-[155px] rounded-md text-indigo-800">
            <h6>Recent Views</h6>
          </span>
        </div>
      )}

      <SelectCustomer />
      <div className="flex justify-center sticky top-0 mb-1">
        <span className="bg-blue-200 p-3 rounded-l-md border border-blue-300 border-r-0 select-none">
          <CustomerName id={params._id || ''} />
        </span>
        <span className="bg-blue-100 p-3 rounded-r-md border border-blue-300 border-l-0">
          {cust.solution}
        </span>
      </div>

      {/* {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(cust, null, 2)}</pre>} */}

      <NetworkConfig />
      <Method method={cust.methodInfo} cid={cid} />
      <Contact contact={cust.contact} cid={cid} />
      <Server server={cust.server} cid={cid} />
      <Device device={cust.devicePassword} cid={cid} />
      <Setup setup={cust.serverSetup} cid={cid} />
    </>
  )
}

export default cust
