'use client'
//prettier-ignore
import { useState, useEffect, SubmitButton, TextInput,useAppDispatch, fetchCustomers, axios, Cross, CheckCircle } from '@components'
import SolutionExists from './addCustomer/SolutionExists'
import AddedSuccessfully from './addCustomer/AddedSuccessfully'

type solutionType = {
  _id: string
  name: string
}

const AddCustomer = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [solutions, setSolutions] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState('choose')
  const [added, setAdded] = useState(false)
  const [newId, setNewId] = useState('')
  const [newCust, setNewCust] = useState('')
  const [newSolution, setNewSolution] = useState('')
  const [newSolErr, setNewSolErr] = useState(false)
  const [newSolBlank, setNewSolBlank] = useState(false)
  const [solNameExists, setSolNameExists] = useState(false)
  const [custNameExists, setCustNameExists] = useState(false)

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    await axios
      .get('solutions')
      .then(res => {
        const names = res.data.map((s: solutionType) => s.name)
        setSolutions(names.sort())
      })
      .catch(err => console.log(err))
  }

  if (!solutions.length) {
    return 'Loading...'
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelected(selectedValue)

    if (selectedValue === 'new') {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const cancel = () => {
    setNewSolution('')
    setShow(false)
    setSelected('choose')
    setNewSolErr(false)
    setNewSolBlank(false)
    setSolNameExists(false)
    setNewSolution('')
  }
  const firstUpper = newSolution.charAt(0).toUpperCase() + newSolution.slice(1)

  const lower = solutions.map(s => s.toLocaleLowerCase())
  const dup = (newS: string) => lower.includes(newS)

  const addSolution = (e: React.FormEvent) => {
    e.preventDefault()
    setSolNameExists(false)

    if (newSolution !== '') {
      if (dup(newSolution.toLowerCase())) {
        console.log('name exists')
        setSolNameExists(true)
      } else {
        axios.post('solutions', { name: firstUpper }).then(res => {
          console.log(res)
          if (res.statusText === 'Created') {
            console.log('ok')
            fetchSolutions()
            setSelected(firstUpper)
            setShow(false)
            setNewSolution('')
          }
        })
      }
    } else {
      setNewSolBlank(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selected === 'new' && newSolution.length === 0) {
      setNewSolBlank(true)
    } else if (
      selected === 'new' &&
      newSolution.length > 0 &&
      dup(newSolution.toLowerCase())
    ) {
      setSolNameExists(true)
      setNewSolErr(false)
    } else if (selected === 'new' && newSolution.length > 0) {
      setNewSolErr(true)
      setNewSolBlank(false)
    } else {
      axios.post('customers', { name: name, solution: selected }).then(res => {
        console.log(res)
        if (res.statusText === 'Created') {
          console.log(res)
          setNewId(res.data._id)
          setAdded(true)
          if (selected !== 'None') {
            addSolutionInfo(res.data._id)
          }
          dispatch(fetchCustomers())
          setNewCust(name) //to display name upon submission

          // resetting form
          setName('')
          setSelected('')
        }
      })
    }
  }

  const placeholder = newSolBlank ? 'enter new solution' : ''

  const addSolutionInfo = (id: string) => {
    console.log('new cust added', id)
    const url = `customers/${id}/insertSolutionInfo`
    axios
      .put(url, { name: selected, portal: '', username: '', password: '' })
      .then(res => console.log(res.data))
  }

  return (
    <div className="mt-6 mx-auto place-self-center w-full sm:w-[550px]  flex flex-col ">
      <form onSubmit={handleSubmit}>
        <fieldset className="p-6 bg-blue-100 border border-blue-300">
          <legend>Add Customer</legend>
          <TextInput
            name="name"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <div className="item">
            <label htmlFor="solution">solution</label>
            <select
              name="solution"
              id="solution"
              onChange={handleSelect}
              value={selected}
              required
            >
              <option value="">Choose one</option>
              {solutions.map(sol => (
                <option key={sol} value={sol}>
                  {sol}
                </option>
              ))}
              <option value="new">ADD NEW</option>
            </select>
          </div>
          {show && (
            <div className="w-full flex justify-end items-center">
              <form
                className={`bg-indigo-200 border border-indigo-300 w-3/5 py-2 rounded-md ${
                  newSolErr && ''
                }`}
              >
                <div className="flex flex-col">
                  {/* <label htmlFor="new">new solution</label> */}
                  <input
                    type="text"
                    value={newSolution}
                    onChange={e => {
                      setNewSolution(e.target.value)
                      setSolNameExists(false)
                      setNewSolErr(false)
                      setNewSolBlank(false)
                    }}
                    required
                    placeholder={placeholder}
                    className={` ${
                      (newSolBlank || solNameExists) && 'bg-red-200 border border-red-600'
                    }`}
                  />
                </div>
                <div className="flex justify-center items-center p-2">
                  <CheckCircle
                    onClick={addSolution}
                    title="Add New Solution"
                    className={`hover:text-green-600 ${
                      newSolErr &&
                      'text-green-600 text-[40px] animate-bounce hover:animate-none'
                    }`}
                  />
                  <Cross onClick={cancel} title="Cancel" className="hover:text-red-500" />
                </div>
              </form>
            </div>
          )}
          <SubmitButton />
          {solNameExists && <SolutionExists newS={newSolution} />}
        </fieldset>
      </form>
      {added && <AddedSuccessfully newCust={newCust} newId={newId} />}
    </div>
  )
}

export default AddCustomer
