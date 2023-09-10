import {
  useSolutionQuery,
  useSolutionsQuery,
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} from '@services/solutionsApi'

const QueryPlayground = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useSolutionsQuery()

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
  const deleteHandler = async () => {
    await deleteSolution(deleteSol._id)
  }

  return (
    <>
      {isLoading && 'Loading...'}
      {isFetching && 'Fetching...'}
      {error && 'Something went wrong'}
      {isSuccess && JSON.stringify(data)}
      <hr />
      <br />
      <SolutionDetail id="64d8e8c9560e01172cd61cd5" />
      <button onClick={addHandler}>add</button>
      <button onClick={updateHandler}>update</button>
      <button onClick={deleteHandler}>delete</button>
    </>
  )
}

export default QueryPlayground
