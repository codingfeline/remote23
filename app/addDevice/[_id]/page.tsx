'use client'

import {
  CustomerType,
  UseBack,
  TextInput,
  UseForm,
  EditFormLabel,
  SubmitButton,
} from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    make: '',
    username: '',
    password: '',
    api: 'insertDevice',
    cid,
  })

  return (
    <EditFormLabel cid={cid} label="Add Device">
      <form onSubmit={handleSubmit}>
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
