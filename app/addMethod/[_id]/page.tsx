'use client'

import { CustomerType, TextArea, TextInput, UseBack, UseForm } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    url: '',
    username: '',
    password: '',
    note: '',
  })

  return (
    <>
      <h5>Add Method</h5>
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
            name="url"
            value={formData.url}
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
          <TextArea
            name="note"
            value={formData.name}
            required
            onChange={handleInputChange}
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
