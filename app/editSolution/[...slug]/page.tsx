'use client'
//prettier-ignore
import { TextInput, useAppDispatch, useAppSelector, EditFormLabel, SubmitButton, SolutionInfoType, useEffect, useState, ChangeEvent, FormEvent, axios, useRouter, fetchCustomers, fetchSolutions } from '@components'

const EditSolutionInfo = ({ params }: { params: { slug: string } }) => {
  const cid = params.slug[0]
  const mid = params.slug[1]
  const router = useRouter()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const [formData, setFormData] = useState<SolutionInfoType>({} as SolutionInfoType)
  const solutions = useAppSelector(state => state.solution.solutions)
    .filter(s => s.name !== 'None')
    .map(s => s.name)
    .sort()

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const url = `customers/${cid}/updateSolution`
    axios
      .put(url, formData)
      .then(res => {
        if (res.statusText === 'OK') {
          router.back()
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchSolutions())
    fetchDataFromApi()
  }, [])

  const fetchDataFromApi = async () => {
    const url = `customers/${cid}/${mid}/findSolution`
    await axios
      .get(url)
      .then(res => {
        setFormData({
          name: res.data.name,
          username: res.data.username,
          password: res.data.password,
          _id: res.data._id,
          portal: res.data.portal,
        })
      })
      .catch(err => console.log(err))
  }

  if (!customers.length) {
    return 'Loading...'
  }

  return (
    <EditFormLabel cid={cid} label="Solution Info">
      <form onSubmit={handleSubmitForm}>
        <div className="item">
          <label htmlFor="name">solution</label>
          <select name="name" id="name" onChange={handleInputChange} required>
            <option value="">Choose one</option>
            {solutions.map((sol, i) => (
              <option value={sol} key={i} selected={sol === formData.name}>
                {sol}
              </option>
            ))}
          </select>
        </div>
        <TextInput name="portal" value={formData.portal} onChange={handleInputChange} />
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default EditSolutionInfo
