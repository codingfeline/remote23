'use client'
//prettier-ignore
import { BackButton, CustomerType, EditFormLabel, Link, SubmitButton, TextArea, TextInput, UseBack, UseForm, axios } from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    methodName: '',
    url: '',
    username: '',
    password: '',
    notes: '',
    api: 'insertMethod',
    cid: params._id,
  })

  return (
    <EditFormLabel label="Add Method" cid={cid}>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          value={formData.methodName}
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
          name="notes"
          value={formData.notes}
          required
          onChange={handleInputChange}
        />
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
