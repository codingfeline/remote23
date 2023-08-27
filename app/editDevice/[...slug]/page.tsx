'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType, EditFormLabel, BackButton, SubmitButton } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { DevicePasswordType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from '@components/axios'

const EditContact = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const [formData, setFormData] = useState<DevicePasswordType>({} as DevicePasswordType)

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
    const url = `customers/${cid}/updateDevice`
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
    const url = `customers/${cid}/${mid}/findDevice`
    await axios
      .get(url)
      .then(res => {
        setFormData({
          make: res.data.make,
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
    <EditFormLabel cid={cid} label="Device">
      <div className="editForm">
        <form
          onSubmit={handleSubmitForm}
          className="bg-orange-100 border border-orange-200"
        >
          <TextInput
            name="make"
            value={formData.make}
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
          <SubmitButton />
        </form>
        <BackButton cid={cid} />
      </div>
    </EditFormLabel>
  )
}

export default EditContact
