'use client'
//prettier-ignore
import { TextInput, useRouter, SolutionType, useEffect, useState, ChangeEvent, FormEvent } from '@components'
import {
  useSolutionQuery,
  useSolutionsQuery,
  useUpdateSolutionMutation,
} from '@query/features/solution/solutionSlice'
// } from '@services/solutionsApi'

const EditSolution = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const cid = params.slug[0]
  const { data, isSuccess, error, isLoading: isLoadingSolution } = useSolutionQuery(cid)
  const [name, setName] = useState<string>('')
  const [updateSolution, { isLoading }] = useUpdateSolutionMutation()
  // const { data2 } = useSolutionsQuery()
  const [formData, setFormData] = useState<SolutionType>({} as SolutionType)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  // const handleSubmitForm = (e: FormEvent) => {
  //   e.preventDefault()
  //   const url = `customers/${cid}/updateNetwork`
  //   axios
  //     .put(url, formData)
  //     .then(res => {
  //       if (res.statusText === 'OK') {
  //         router.back()
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const sol = { _id: formData._id, name: formData.name }
      await updateSolution(sol)
      router.push('/')
    } catch (error) {
      console.log('failed to submit')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setFormData({ ...data })
    }
  }, [cid, data])

  if (isLoadingSolution) return <p>Loading...</p>
  if (error) return <p>Error occured</p>

  return (
    // <EditFormLabel label="Network" cid={cid}>
    <form>
      {/* {isSuccess && <TextInput name="name" value={data.name} onChange={(e)=>setName(e.target.value)} required />} */}
      {/* {isSuccess && ( */}
      <TextInput name="name" value={formData.name} onChange={handleInputChange} />
      {/* )} */}
      <button onClick={handleUpdate}>Update</button>
      {/* <SubmitButton /> */}
    </form>
    // </EditFormLabel>
  )
}

export default EditSolution
