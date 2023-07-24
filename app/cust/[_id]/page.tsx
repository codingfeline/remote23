'use client'
//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers } from '@components'

const cust = ({ params }: { params: CustomerType }) => {
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter((cust: CustomerType) => cust._id == params._id)[0]
  const copy = useAppSelector(state => state.copy.value)
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <>
      <span className={`transition-opacity ${copy ? 'opacity-1' : ' opacity-0'}`}>
        {copy && (
          <>
            Copied <i>{copy}</i>
          </>
        )}
      </span>
      <div className="flex gap-1 flex-wrap">
        {customers.map(cust => (
          <Link key={cust._id} href={`./${cust._id}`}>
            {cust.name}
          </Link>
        ))}
        <Link href="/">Home</Link>
      </div>
      {cust._id}, {cust.name}
      <hr />
      {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(cust, null, 2)}</pre>}
      <hr />
      <Method method={cust.methodInfo} />
      <Contact contact={cust.contact} />
      <Server server={cust.server} />
      <Device device={cust.devicePassword} />
      <Setup setup={cust.serverSetup} />
    </>
  )
}

export default cust
