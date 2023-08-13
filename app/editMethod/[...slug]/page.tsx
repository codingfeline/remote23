'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { MethodType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from 'axios'

const EditMethod = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const [formData, setFormData] = useState<MethodType>({} as MethodType)

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
    const url = `http://localhost:3121/api/customers/${cid}/updateMethodInfo`
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
        `http://localhost:3121/api/customers/${cid}/${mid}/findMethod`
      )
      if (response.ok) {
        const data = await response.json()
        setFormData({
          methodName: data.methodName,
          url: data.url,
          username: data.username,
          password: data.password,
          notes: data.notes,
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
          name="methodName"
          value={formData.methodName}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="url"
          value={formData.url}
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
        <TextArea
          name="notes"
          value={formData.notes}
          required
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {/* ))} */}
      <button onClick={() => router.back()}>back</button>
    </>
  )
}

export default EditMethod
