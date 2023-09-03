'use client'
//prettier-ignore
import { useState, useEffect, SubmitButton, TextInput, useAppSelector, useAppDispatch, fetchCustomers, axios, ItemExists, AddedSuccessfully, AddSolution, SelectSolution, FormEvent, ChangeEvent, fetchSolutions, addOneSolution, Plus } from '@components'

const AddCustomer = () => {
  const dispatch = useAppDispatch()
  const customerNames = useAppSelector(state => state.customer.customers).map(c => c.name)
  const solutions = useAppSelector(state => state.solution.solutions)
    .map(s => s.name)
    .sort()
  const [name, setName] = useState<string>('')
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
  const [test, setTest] = useState('')

  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchSolutions())
  }, [])

  const cancel = () => {
    setShow(false)
    setSelected('choose')
    setNewSolution('')
    setNewSolBlank(false)
    setSolNameExists(false)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelected(selectedValue)
    selectedValue === 'new' ? setShow(true) : setShow(false)
  }

  const firstUpper = newSolution.charAt(0).toUpperCase() + newSolution.slice(1)

  const addSolution = (e: FormEvent) => {
    e.preventDefault()
    const lower = solutions.map(s => s.toLowerCase())
    const dup = (newS: string) => lower.includes(newS)
    if (newSolution !== '') {
      if (dup(newSolution.toLowerCase())) {
        console.log('name exists')
        setSolNameExists(true)
      } else {
        // axios.post('solutions', { name: firstUpper }).then(res => {
        //   console.log(res)
        //   if (res.statusText === 'Created') {
        //     console.log('ok')
        //     dispatch(fetchSolutions())
        //     setSelected(firstUpper)
        //     setShow(false)
        //     setNewSolution('')
        //   }
        // })
        const info = { name: firstUpper }
        try {
          // Dispatch the addSolution action with the solutionData
          dispatch(addOneSolution(info))

          dispatch(fetchSolutions())
          setSelected(firstUpper)
          setShow(false)
          setNewSolution('')

          // Optionally, you can handle success or reset the form here
          // setSolutionData({ title: '', description: '' });
        } catch (error) {
          // Handle any errors that may occur during the dispatch
          console.error('Error creating solution:', error)
        }
        // dispatch(addSolution(info))
      }
    } else {
      setNewSolBlank(true)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchCustomers())
    const lower = solutions.map(s => s.toLowerCase())
    const dup = (newS: string) => lower.includes(newS)
    if (customerNames.map(c => c.toLowerCase()).includes(name.toLowerCase())) {
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

  const handleTest = async (e: FormEvent) => {
    e.preventDefault()
    solutions.push(test)
    const duplicate = solutions
      .map(s => s.toLowerCase())
      .includes(newSolution.toLowerCase())
    if (newSolution.length === 0) {
      setNewSolBlank(true)
    } else if (duplicate) {
      console.log('duplicate')
      setSolNameExists(true)
    } else {
      const info = { name: firstUpper }
      console.log('button', info)
      try {
        await dispatch(addOneSolution(info))
        dispatch(fetchSolutions())
        setSelected(firstUpper)
        setShow(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (!solutions.length) return 'Loading...'
  return (
    <div className="mt-6 mx-auto place-self-center w-full sm:w-[550px]  flex flex-col ">
      {test}
      <form onSubmit={handleSubmit}>
        <fieldset className="p-6 bg-blue-100 border border-blue-300">
          <legend>Add Customer</legend>
          <TextInput name="name" value={name} required onChange={handleNameChange} />
          <SelectSolution
            selected={selected}
            solutions={solutions}
            handleSelect={handleSelect}
          />
          <SubmitButton />
          {custNameExists && <ItemExists item={name} />}
        </fieldset>
      </form>
      {show && (
        <AddSolution
          newSolution={newSolution}
          handleSolChange={handleSolChange}
          newSolBlank={newSolBlank}
          solNameExists={solNameExists}
          addSolution={handleTest}
          newSolErr={newSolErr}
          cancel={cancel}
        />
      )}
      {solNameExists && <ItemExists item={newSolution} />}
      {added && <AddedSuccessfully newCust={newCust} newId={newId} />}
    </div>
  )
}

export default AddCustomer
