'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, ScanEmailType, EditFormLabel, useAppDispatch, useAppSelector, CustomerType, BackButton, SubmitButton } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
// import { ScanEmailType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from '@components/axios'

const EditContact = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const [formData, setFormData] = useState<ScanEmailType>({} as ScanEmailType)

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
    const url = `customers/${cid}/updateScanEmail`
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
    const url = `customers/${cid}/${mid}/findScanEmail`
    await axios
      .get(url)
      .then(res => {
        setFormData({
          hostname: res.data.hostname,
          username: res.data.username,
          password: res.data.password,
          _id: res.data._id,
          port: res.data.port,
        })
      })

      .catch(err => console.log(err))
  }

  if (Object.keys(formData).length === 0) {
    return (
      <div className="error">
        <p>loading...</p>
        <button onClick={() => router.push('/')}>home</button>
      </div>
    )
  }
  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <EditFormLabel cid={cid} label="Scan-to-Email">
      <form onSubmit={handleSubmitForm}>
        <TextInput
          name="hostname"
          value={formData.hostname}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="port"
          value={formData.port}
          onChange={handleInputChange}
          required
        />
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default EditContact
