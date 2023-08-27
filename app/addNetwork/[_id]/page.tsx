'use client'

import { CustomerType, UseBack, TextInput, UseForm } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    domain: '',
    api: 'insertNetwork',
    cid: params._id || '',
    dns: '',
  })

  return (
    <>
      <h5>Add Device</h5>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Device info</legend>
          <TextInput
            name="name"
            value={formData.name}
            required
            onChange={handleInputChange}
          />
          <TextInput
            name="domain"
            value={formData.domain}
            required
            onChange={handleInputChange}
          />
          <TextInput
            type="text"
            name="dns"
            value={formData.dns}
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
