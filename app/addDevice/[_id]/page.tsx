'use client'

import { CustomerType, UseBack, TextInput, UseForm } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    make: '',
    username: '',
    password: '',
    api: 'insertDevice',
    cid: params._id || '',
  })

  return (
    <>
      <h5>Add Device</h5>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Device info</legend>
          <TextInput
            name="make"
            value={formData.make}
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
    </>
  )
}

export default AddContact
