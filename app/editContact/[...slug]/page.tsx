'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { ContactType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from 'axios'

const EditContact = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const [formData, setFormData] = useState<ContactType>({} as ContactType)

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
    const url = `http://localhost:3121/api/customers/${cid}/updateContact`
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
        `http://localhost:3121/api/customers/${cid}/${mid}/findContact`
      )
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name,
          tel: data.tel,
          email: data.email,
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
        <TextInput
          name="tel"
          value={formData.tel}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="email"
          value={formData.email}
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

export default EditContact
