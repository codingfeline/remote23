'use client'
//prettier-ignore
import { CustomerType, Link, TextArea, TextInput, UseBack, UseForm, axios } from '@components'

const AddContact = ({ params }: { params: CustomerType }) => {
  const { formData, handleInputChange, handleSubmit } = UseForm({
    methodName: '',
    url: '',
    username: '',
    password: '',
    notes: '',
    api: 'insertOneMethod',
    cid: params._id || '',
  })

  return (
    <>
      <h5>Add Method</h5>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Remote Method</legend>
          <TextInput
            name="methodName"
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
        </fieldset>
        <div>
          <button type="submit" className="link">
            Submit
          </button>
        </div>
        <Link href={`/cust/${params._id}`}>go to cust</Link>
      </form>
      <UseBack />
    </>
  )
}

export default AddContact

// this.$axios
// .put(
//   '/api/customers/' + this.id + '/insertOneMethod',
//   { methodInfo },
//   { headers: { token } }
// )
// .then((res) => {
//   if (res.statusText === 'OK') {
//     // console.log('insert ok', ip, id)
//     this.getCustomers() // update data
//     this.$router.push(`/customer/${this.id}`)
//   }
// })
