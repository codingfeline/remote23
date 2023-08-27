'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType, EditFormLabel, SubmitButton, BackButton, FormBox } from '@components'
import { fetchCustomers } from '@components'
import { useRouter } from 'next/navigation'
import { MethodType } from '@utils/types/customer'
import CustomerName from '@components/CustomerName'
import axios from '@components/axios'

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
    const url = `customers/${cid}/updateMethodInfo`
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
    await axios
      .get(`customers/${cid}/${mid}/findMethod`)
      .then(res => {
        setFormData({
          methodName: res.data.methodName,
          url: res.data.url,
          username: res.data.username,
          password: res.data.password,
          notes: res.data.notes,
          _id: res.data._id,
        })
      })
      .catch(err => console.log(err))
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <EditFormLabel cid={cid} label="Remote Method">
      <div className="editForm">
        <form
          onSubmit={handleSubmitForm}
          className="bg-yellow-100 border border-yellow-300"
        >
          <TextInput
            name="method"
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
          <SubmitButton />
        </form>
        <BackButton cid={cid} />
      </div>
    </EditFormLabel>
  )
}

export default EditMethod
