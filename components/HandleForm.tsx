import { useState, ChangeEvent, FormEvent } from 'react'

interface FormData {
  [key: string]: string
}

const UseForm = (initialFormData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(formData) // You can perform any action with the form data here.
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
  }
}

export default UseForm
