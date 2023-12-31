import { useState, ChangeEvent, FormEvent } from 'react'
import axios from '@components/axios'
import { useRouter } from 'next/navigation'

interface FormData {
  [key: string]: string
}

const UseForm = (initialFormData: FormData) => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const url = `customers/${formData.cid}/${formData.api}`
    axios
      .put(url, formData)
      .then(res => {
        if (res.statusText === 'OK') {
          router.back()
        }
      })
      .catch(err => console.log(err))
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
  }
}

export default UseForm
