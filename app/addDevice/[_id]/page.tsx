'use client'

import { CustomerType, UseBack, TextInput, UseForm } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    username: '',
    password: '',
  })

  return (
    <>
      <h5>Add Device</h5>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>IT Contact</legend>
          <TextInput
            name="name"
            value={formData.name}
            required
            onChange={handleInputChange}
          />
          <TextInput
            name="username"
            value={formData.username}
            required
            onChange={handleInputChange}
          />
          <TextInput
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={handleInputChange}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <UseBack />
      {JSON.stringify(formData)}
    </>
  )
}

export default AddContact
