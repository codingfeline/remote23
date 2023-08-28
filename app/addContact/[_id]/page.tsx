'use client'
//prettier-ignore
import { UseForm, TextInput, EditFormLabel, SubmitButton } from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    tel: '',
    email: '',
    api: 'insertContact',
    cid,
  })

  return (
    <EditFormLabel cid={cid} label="Add Contact">
      <form onSubmit={handleSubmit}>
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
