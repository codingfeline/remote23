'use client'

import { CustomerType, UseBack, TextInput, UseForm } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    hostname: '',
    username: '',
    password: '',
    folder: '',
    api: 'insertScanFolder',
    cid: params._id || '',
  })

  return (
    <>
      <h5>Add Device</h5>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Device info</legend>
          <TextInput
            name="hostname"
            value={formData.hostname}
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
          <TextInput
            type="text"
            name="folder"
            value={formData.folder}
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
