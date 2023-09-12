import { Cross, Link, SolutionType, useState } from '@components'
import {
  useSolutionQuery,
  useSolutionsQuery,
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} from '@services/solutionsApi'

const QueryPlayground = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useSolutionsQuery()
  const [showUpdate, setShowUpdate] = useState(false)

  const SolutionDetail = ({ id }: { id: string }) => {
    const { data } = useSolutionQuery(id)
    return JSON.stringify(data)
  }

  const solution = {
    name: 'testing',
  }
  const [addSolution] = useAddSolutionMutation()
  const [updateSolution] = useUpdateSolutionMutation()
  const [deleteSolution] = useDeleteSolutionMutation()

  const addHandler = async () => {
    await addSolution(solution)
  }

  const updateSol = {
    _id: '64fdf16dc94953252c2e46c8',
    name: 'newOne2a',
  }
  const deleteSol = {
    _id: '64fdf16dc94953252c2e46c8',
  }
  const updateHandler = async () => {
    // console.log('update')
    await updateSolution(updateSol)
  }
  const deleteHandler = async (id: string) => {
    await deleteSolution(id)
  }

  const initUpdate = () => {
    setShowUpdate(true)
  }
  const UpdateForm = (sol: SolutionType) => {
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

export default QueryPlayground
