'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType, EditFormLabel, SubmitButton, BackButton } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { ServerType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from '@components/axios'

const EditServer = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const [formData, setFormData] = useState<ServerType>({} as ServerType)

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
    const url = `customers/${cid}/updateServer`
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
    const url = `customers/${cid}/${mid}/findServer`
    await axios
      .get(url)
      .then(res => {
        setFormData({
          name: res.data.name,
          ip: res.data.ip,
          username: res.data.username,
          password: res.data.password,
          _id: res.data._id,
        })
      })
      .catch(err => console.log(err))
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <EditFormLabel cid={cid} label="Server">
      <form onSubmit={handleSubmitForm}>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextInput name="ip" value={formData.ip} onChange={handleInputChange} required />
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
        <SubmitButton />
      </form>
      {/* <BackButton cid={cid} /> */}
    </EditFormLabel>
  )
}

export default EditServer
