'use client'

import {
  BackButton,
  CustomerType,
  EditFormLabel,
  SubmitButton,
  TextInput,
  UseBack,
  UseForm,
} from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    ip: '',
    username: '',
    password: '',
    api: 'insertServer',
    cid,
  })

  return (
    <EditFormLabel cid={cid} label="Add Server">
      <form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextInput name="ip" value={formData.ip} onChange={handleInputChange} required />
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
