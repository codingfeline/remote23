'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, useAppDispatch, useAppSelector, EditFormLabel, SubmitButton } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { ContactType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from '@components/axios'

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
    const url = `customers/${cid}/updateContact`
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
    const url = `customers/${cid}/${mid}/findContact`
    await axios
      .get(url)
      .then(res => {
        setFormData({
          name: res.data.name,
          tel: res.data.tel,
          email: res.data.email,
          _id: res.data._id,
        })
      })
      .catch(err => console.log(err))

    // try {
    //   const response = await fetch(
    //     `https://remoteapi.in-kent.uk/api/customers/${cid}/${mid}/findContact`
    //   )
    //   if (response.ok) {
    //     const data = await response.json()
    //     setFormData({
    //       name: data.name,
    //       tel: data.tel,
    //       email: data.email,
    //       _id: data._id,
    //     })
    //   } else {
    //     console.error('Failed to fetch data from API')
    //   }
    // } catch (error) {
    //   console.error('Error fetching data from API:', error)
    // }
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <EditFormLabel cid={cid} label="Edit Contact">
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default EditContact
