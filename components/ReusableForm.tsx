import React, { useState } from 'react'
import { vpns } from '@utils/helpers'
import TextInput from './TextInput'

// Define types for the form data
interface FormValues {
  name: string
  email: string
  message: string
  method: string
}

// Define the Props for the form component
interface FormProps {
  onSubmit: (data: FormValues) => void
}

const ReusableForm: React.FC<FormProps> = ({ onSubmit }) => {
  vpns.sort()
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
    method: '',
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Customer</legend>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Remote Method</legend>
        <div className="item flex flex-wrap">
          {vpns.map(vpn => (
            <label htmlFor={vpn} className="radioLabel">
              <input
                type="radio"
                id={vpn}
                name="method"
                value={vpn}
                checked={formData.method === vpn}
                onChange={handleInputChange}
                required
              />
              {vpn}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <button type="submit">Submit</button>
      </div>
      {/* {formData.name !== '' && JSON.stringify(formData)} */}
    </form>
  )
}

export default ReusableForm
