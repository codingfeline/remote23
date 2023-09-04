'use client'
//prettier-ignore
import { EditFormLabel, SubmitButton, useEffect, TextInput, ChangeEvent, UseForm, useAppDispatch, useAppSelector, fetchSolutions } from '@components'

const AddContact = ({ params }: { params: { _id: string } }) => {
  const dispatch = useAppDispatch()
  const solutions = useAppSelector(state => state.solution.solutions)
    .filter(s => s.name !== 'None')
    .map(s => s.name)
    .sort()
  const cid = params._id
  const { formData, handleInputChange, handleSubmit } = UseForm({
    name: '',
    portal: '',
    username: '',
    password: '',
    api: 'insertSolution',
    cid,
  })

  useEffect(() => {
    dispatch(fetchSolutions())
  }, [])

  return (
    <EditFormLabel cid={cid} label="Add Solution">
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label htmlFor="name">solution</label>
          <select name="name" id="name" onChange={handleInputChange} required>
            <option value="">Choose one</option>
            {solutions.map((sol, i) => (
              <option value={sol} key={i}>
                {sol}
              </option>
            ))}
          </select>
        </div>
        <TextInput
          name="portal"
          value={formData.portal}
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
        <SubmitButton />
      </form>
    </EditFormLabel>
  )
}

export default AddContact
