import { CustomerType } from '@components'
import UseBack from '@components/useBack'

const AddContact = ({ params }: { params: CustomerType }) => {
  return (
    <>
      <h5>Add Server</h5>
      <form action="">{/* <TextInput  /> */}</form>
      {params._id}
      <UseBack />
    </>
  )
}

export default AddContact
