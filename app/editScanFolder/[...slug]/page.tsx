'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
//prettier-ignore
import { TextInput, ScanFolderType, TextArea, UseForm, useAppDispatch, useAppSelector, CustomerType, SubmitButton, EditFormLabel } from '@components'
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
  const [formData, setFormData] = useState<ScanFolderType>({} as ScanFolderType)

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
    const url = `customers/${cid}/${mid}/findScanFolder`
    await axios
      .get(url)
      .then(res => {
        setFormData({
          hostname: res.data.hostname,
          username: res.data.username,
          password: res.data.password,
          _id: res.data._id,
          folder: res.data.folder,
        })
      })
      .catch(err => console.log(err))
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <div className="editForm">
      <EditFormLabel cust={cust.name} label="Scan-to-folder" />
      <form onSubmit={handleSubmitForm}>
        <TextInput
          name="hostname"
          value={formData.hostname}
          onChange={handleInputChange}
          required
        />
        <TextInput
          name="folder"
          value={formData.folder}
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
      {/* ))} */}
      <button onClick={() => router.back()}>back</button>
    </div>
  )
}

export default EditContact
