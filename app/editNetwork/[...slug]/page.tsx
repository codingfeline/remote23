'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, NetworkType, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType, SubmitButton, EditFormLabel } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import CustomerName from '@components/CustomerName'
import axios from '@components/axios'

const EditContact = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter(c => c._id === params.slug[0])[0]
  const [formData, setFormData] = useState<NetworkType>({} as NetworkType)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const url = `customers/${cid}/updateScanFolder`
    axios
      .put(url, formData)
      .then(res => {
        if (res.statusText === 'OK') {
          router.back()
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    dispatch(fetchCustomers())
    fetchDataFromApi()
  }, [])

  const fetchDataFromApi = async () => {
    const url = `customers/${cid}/${mid}/findNetwork`
    await axios
      .get(url)
      .then(res => {
        const dns = res.data.dns
        const dnsArr = dns.split(',')
        setFormData({
          name: res.data.name,
          domain: res.data.domain,
          _id: res.data._id,
          dns1: dnsArr[0],
          dns2: dnsArr[1],
          dns3: dnsArr[2],
        })
      })
      .catch(err => console.log(err))
  }

  // const DnsSplit = () => {
  //   const dns = formData.dns
  //   if (dns) {
  //     const dnsArr = dns.split(',')
  //     return dnsArr.map((dn, i) => (
  //       <input type="text" value={dn} name={`dn-${i}`} onChange={handleInputChange} />
  //     ))
  //   }
  // }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <div className="editForm">
      <EditFormLabel cust={cust.name} label="Network" />
      <form onSubmit={handleSubmitForm}>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="domain"
          value={formData.domain}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="dns1"
          value={formData.dns1}
          onChange={handleInputChange}
          required
        />
        {formData.dns2 && (
          <TextInput
            name="dns2"
            value={formData.dns2}
            onChange={handleInputChange}
            required
          />
        )}
        {formData.dns3 && (
          <TextInput
            name="dns3"
            value={formData.dns3}
            onChange={handleInputChange}
            required
          />
        )}

        {/* <div className="item">
          <label htmlFor="dns">dns</label>
          <div className="flex flex-col">
            <DnsSplit />
          </div>
        </div> */}
        <SubmitButton />
      </form>
      {/* ))} */}
      <button onClick={() => router.back()}>back</button>
    </div>
  )
}

export default EditContact
