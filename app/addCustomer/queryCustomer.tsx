import { Cross, Link, CustomerType, useState } from '@components'
import {
  useCustomerQuery,
  useCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from '@query/features/customer/customerSlice'

const QueryCustPlayground = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useCustomersQuery()
  const [showUpdate, setShowUpdate] = useState(false)

  const CustomerDetail = ({ id }: { id: string }) => {
    const { data } = useCustomerQuery(id)
    return JSON.stringify(data)
  }

  const customer = {
    name: 'testing cust',
  }
  const [addCustomer] = useAddCustomerMutation()
  const [updateCustomer] = useUpdateCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()

  const addHandler = async () => {
    await addCustomer(customer)
  }

  const updateCust = {
    _id: '64fdf16dc94953252c2e46c8',
    name: 'newOne2a',
  }
  const deleteSol = {
    _id: '64fdf16dc94953252c2e46c8',
  }
  const updateHandler = async () => {
    // console.log('update')
    await updateCustomer(updateCust)
  }
  const deleteHandler = async (id: string) => {
    await deleteCustomer(id)
  }

  const initUpdate = () => {
    setShowUpdate(true)
  }
  const UpdateForm = (sol: CustomerType) => {
    const [name, setName] = useState('')
    return <input type="text" value={name} onChange={e => setName(e.target.value)} />
  }
  return (
    <>
      {isLoading && 'Loading...'}
      {isFetching && 'Fetching...'}
      {error && 'Something went wrong'}
      {/* {isSuccess && JSON.stringify(data)} */}
      {/* <SolutionDetail id="64d8e8c9560e01172cd61cd5" /> */}
      <ul>
        {isSuccess &&
          data.map(sol => (
            <li className="flex justify-between" key={sol._id}>
              <Link href={`editSol/${sol._id}`}>{sol.name}</Link>
              <Cross onClick={() => deleteHandler(sol._id!)} />
            </li>
          ))}
      </ul>
      <hr />
      <br />
      <button onClick={addHandler}>add</button>
    </>
  )
}

export default QueryCustPlayground
