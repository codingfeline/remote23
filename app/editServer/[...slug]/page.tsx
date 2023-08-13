'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { ServerType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from 'axios'

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
    const url = `http://localhost:3121/api/customers/${cid}/updateServer`
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
    try {
      const response = await fetch(
        `http://localhost:3121/api/customers/${cid}/${mid}/findServer`
      )
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name,
          ip: data.ip,
          username: data.username,
          password: data.password,
          _id: data._id,
        })
      } else {
        console.error('Failed to fetch data from API')
      }
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <>
      <CustomerName id={cid} />
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
        <button type="submit">Submit</button>
      </form>
      {/* ))} */}
      <button onClick={() => router.back()}>back</button>
    </>
  )
}

export default EditServer
