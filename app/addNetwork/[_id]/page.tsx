'use client'
//prettier-ignore
import { CustomerType, UseBack, TextInput, UseForm, EditFormLabel, SubmitButton,
} from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    domain: '',
    api: 'insertNetwork',
    cid,
    dns: '',
  })

  return (
    <EditFormLabel cid={cid} label="Add Device">
      <form onSubmit={handleSubmit}>
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
