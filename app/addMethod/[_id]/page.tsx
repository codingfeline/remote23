import { CustomerType } from '@components'
import UseBack from '@components/useBack'

type one = {
  _id: string
}

const AddContact = ({ params }: { params: one }) => {
  return (
    <>
      <h5>Add Method</h5>
      <form action="">{/* <TextInput  /> */}</form>
      {params._id}
      <UseBack />
    </>
  )
}

export default AddContact
