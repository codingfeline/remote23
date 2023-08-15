'use client'
//prettier-ignore
import {  useAppSelector, useAppDispatch, useEffect, useState, Contact, Show, Hide, Link, CustomerType, Method, Server, Device, Setup, fetchCustomers } from '@components'
import CustomerName from '@components/CustomerName'
import NetworkConfig from '@components/network'
import { useRouter } from 'next/navigation'
import Select, { OptionTypeBase } from 'react-select'

const cust = ({ params }: { params: CustomerType }) => {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter((cust: CustomerType) => cust._id === params._id)[0]
  const cid = params._id || ''
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const options: Option[] = customers
    .map(c => {
      return {
        label: c.name + ' (' + c.solution + ')',
        value: c._id,
      }
    })
    .sort((a, b) => {
      let fa = a.label.toLowerCase(),
        fb = b.label.toLowerCase()

      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (!customers.length) {
    return 'Loading...'
  }

  interface Option {
    value: string
    label: string
  }

  const handleChange = (selected: OptionTypeBase<Option> | null) => {
    setSelectedOption(selected)
    if (selected) {
      router.push(`./${selected.value}`)
    }
  }

  return (
    <>
      <Select<Option>
        className="w-1/2 m-auto my-1"
        value={selectedOption}
        options={options}
        onChange={handleChange}
      />
      <div className="flex justify-center">
        <span className="bg-blue-200 p-3 rounded-l-md border border-blue-300 border-r-0">
          <CustomerName id={params._id || ''} />
        </span>
        <span className="bg-blue-100 p-3 rounded-r-md border border-blue-300 border-l-0">
          {cust.solution}
        </span>
      </div>
      {show ? (
        <Hide onClick={() => setShow(prev => !prev)} />
      ) : (
        <Show onClick={() => setShow(prev => !prev)} />
      )}
      {show && <pre>{JSON.stringify(cust, null, 2)}</pre>}
      <hr />
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
