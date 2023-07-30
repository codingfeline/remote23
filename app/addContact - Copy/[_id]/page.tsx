import { CustomerType } from '@components'
import TextInput from '@components/TextInput'
import React from 'react'

const AddContact = ({ params }: { params: CustomerType }) => {
  return (
    <>
      <h5>Add Contact</h5>
      <form action="">{/* <TextInput  /> */}</form>
      {params._id}
    </>
  )
}

export default AddContact
