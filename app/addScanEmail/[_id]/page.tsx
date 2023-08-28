'use client'
//prettier-ignore
import { TextInput, UseForm, EditFormLabel, SubmitButton } from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    hostname: '',
    username: '',
    password: '',
    port: '',
    api: 'insertScanEmail',
    cid,
  })

  return (
    <EditFormLabel cid={cid} label="Add Scan-to-Email">
      <form onSubmit={handleSubmit}>
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
          name="port"
          value={formData.port}
          required
          onChange={handleInputChange}
        />
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
