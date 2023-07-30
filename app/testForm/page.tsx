'use client'

import React from 'react'
import ReusableForm from '@components/ReusableForm'

interface FormValues {
  name: string
  email: string
  message: string
}

const MyFormComponent = () => {
  const handleSubmitForm = (data: FormValues) => {
    // Do something with the form data, such as sending it to a server
    console.log(data)
  }

  return (
    <div>
      <h2>My Form</h2>
      <ReusableForm onSubmit={handleSubmitForm} />
    </div>
  )
}

export default MyFormComponent
