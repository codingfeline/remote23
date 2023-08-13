'use client'

import { CustomerType, UseForm, UseBack, TextInput } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    tel: '',
    email: '',
    api: 'insertContact',
    cid: params._id || '',
  })

  return (
    <>
      <h5>Add Contact</h5>
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
            name="tel"
            value={formData.tel}
            required
            onChange={handleInputChange}
          />
          <TextInput
            type="email"
            name="email"
            value={formData.email}
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
