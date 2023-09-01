'use client'
//prettier-ignore
import { useState, useEffect, SubmitButton, TextInput, useAppSelector, useAppDispatch, fetchCustomers, axios, ItemExists, AddedSuccessfully, AddSolution, SelectSolution, SolutionType, FormEvent, ChangeEvent } from '@components'
import ParentChild from './addCustomer/ParentChild'
import UseApiCall from '@components/useApiCall'

const AddCustomer = () => {
  const dispatch = useAppDispatch()
  const customerNames = useAppSelector(state => state.customer.customers).map(c => c.name)
  const [name, setName] = useState<string>('')
  const [solutions, setSolutions] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState('choose')
  const [added, setAdded] = useState(false)
  const [newId, setNewId] = useState('')
  const [newCust, setNewCust] = useState('')
  const [newSolution, setNewSolution] = useState('')
  const [newSolBlank, setNewSolBlank] = useState(false)
  const [solNameExists, setSolNameExists] = useState(false)
  const [custNameExists, setCustNameExists] = useState(false)
  const [newSolErr, setNewSolErr] = useState(false)

  useEffect(() => {
    fetchSolutions()
    dispatch(fetchCustomers())
  }, [])

  const cancel = () => {
    setShow(false)
    setSelected('choose')
    setNewSolution('')
    setNewSolBlank(false)
    setSolNameExists(false)
  }

  const fetchSolutions = async () => {
    await axios
      .get('solutions')
      .then(res => {
        const names = res.data.map((s: SolutionType) => s.name)
        setSolutions(names.sort())
      })
      .catch(err => console.log(err))
  }

  if (!solutions.length) return 'Loading...'

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelected(selectedValue)
    selectedValue === 'new' ? setShow(true) : setShow(false)
  }

  const firstUpper = newSolution.charAt(0).toUpperCase() + newSolution.slice(1)
  const lower = solutions.map(s => s.toLocaleLowerCase())
  const dup = (newS: string) => lower.includes(newS)

  const addSolution = (e: FormEvent) => {
    e.preventDefault()
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchCustomers())
    const custLower = customerNames.map(cn => cn.toLowerCase())
    if (custLower.includes(name.toLowerCase())) {
      setCustNameExists(true)
    } else if (selected === 'new' && newSolution.length === 0) {
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
          setNewCust(name)
          setName('')
          setSelected('')
        }
      })
    }
  }

  const addSolutionInfo = (id: string) => {
    console.log('new cust added', id)
    const url = `customers/${id}/insertSolutionInfo`
    axios
      .put(url, { name: selected, portal: '', username: '', password: '' })
      .then(res => console.log(res.data))
  }

  const handleSolChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSolution(e.target.value)
    setSolNameExists(false)
    setNewSolErr(false)
    setNewSolBlank(false)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setCustNameExists(false)
  }

  return (
    <div className="mt-6 mx-auto place-self-center w-full sm:w-[550px]  flex flex-col ">
      <form onSubmit={handleSubmit}>
        <fieldset className="p-6 bg-blue-100 border border-blue-300">
          <legend>Add Customer</legend>
          <TextInput name="name" value={name} required onChange={handleNameChange} />
          <SelectSolution
            selected={selected}
            solutions={solutions}
            handleSelect={handleSelect}
          />
          {show && (
            <AddSolution
              newSolution={newSolution}
              handleSolChange={handleSolChange}
              newSolBlank={newSolBlank}
              solNameExists={solNameExists}
              addSolution={addSolution}
              newSolErr={newSolErr}
              cancel={cancel}
            />
          )}
          <SubmitButton />
          {custNameExists && <ItemExists item={name} />}
          {solNameExists && <ItemExists item={newSolution} />}
        </fieldset>
      </form>
      {added && <AddedSuccessfully newCust={newCust} newId={newId} />}
    </div>
  )
}

export default AddCustomer
