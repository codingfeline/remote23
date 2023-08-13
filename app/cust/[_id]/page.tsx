'use client'
//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers } from '@components'
import CustomerName from '@components/CustomerName'

const cust = ({ params }: { params: CustomerType }) => {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter((cust: CustomerType) => cust._id === params._id)[0]
  const copy = useAppSelector(state => state.copy.value)
  // localStorage.setItem('_id', JSON.stringify(params._id))
  const cid = params._id || ''

  useEffect(() => {
    dispatch(fetchCustomers())
    // localStorage.setItem('_id', JSON.stringify(params._id))
  }, [])

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <>
      {' '}
      <span className={`transition-opacity ${copy ? 'opacity-1' : ' opacity-0'}`}>
        {copy && (
          <>
            Copied <i>{copy}</i>
          </>
        )}
      </span>
      <div className="links">
        {customers.map(cust => (
          <Link key={cust._id} href={`./${cust._id}`}>
            {cust.name}
          </Link>
        ))}
      </div>
      {/* {cust._id}, {cust.name} */}
      Customer:
      <span className="ml-2">
        <CustomerName id={params._id || ''} />
      </span>
      <hr />
      {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(cust, null, 2)}</pre>}
      <hr />
      <Method method={cust.methodInfo} cid={cid} />
      <Contact contact={cust.contact} cid={cid} />
      <Server server={cust.server} cid={cid} />
      <Device device={cust.devicePassword} cid={cid} />
      <Setup setup={cust.serverSetup} cid={cid} />
    </>
  )
}

export default cust
