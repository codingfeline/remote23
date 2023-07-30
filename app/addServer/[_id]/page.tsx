'use client'

import { CustomerType, TextInput, UseBack, UseForm } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    ip: '',
    username: '',
    password: '',
  })

  return (
    <>
      <h5>Add Server</h5>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Remote Method</legend>
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextInput
            name="ip"
            value={formData.ip}
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
        </fieldset>
        <div>
          <button type="submit" className="link">
            Submit
          </button>
        </div>
      </form>
      <UseBack />
    </>
  )
}

export default AddContact
