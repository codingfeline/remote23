'use client'
import SubmitReset from '@app/addCustomer/SubmitReset'
import QueryPlayground from '@app/addCustomer/query'
import QueryCustPlayground from '@app/addCustomer/queryCustomer'
//prettier-ignore
import { useState, useEffect, SubmitButtonCol, TextInputCol, Cross, TextInput, SubmitButton,  useAppSelector, useAppDispatch, fetchCustomers, axios, Error, AddedSuccessfully, AddSolution, SelectSolution, FormEvent, ChangeEvent, fetchSolutions, addOneSolution, Send, Bin } from '@components'
//prettier-ignoer
import {
  useSolutionsQuery,
  useSolutionNamesQuery,
  useAddSolutionMutation,
} from '@query/features/solution/solutionSlice'

const AddCustomer = () => {
  const {
    data: solutions,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useSolutionNamesQuery()
  const dispatch = useAppDispatch()
  const customerNames = useAppSelector(state => state.customer.customers).map(c => c.name)
  // const solutions = useAppSelector(state => state.solution.solutions)
  //   .map(s => s.name)
  //   .sort()
  // const solutions = data.map(s => s.name).sort()

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
  const [nameSolutionEmpty, setNameSolutionEmpty] = useState(false)

  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchSolutions())
  }, [])

  const resetSolution = () => {
    setSelected('choose')
    setNewSolution('')
    setShow(false)
    setNewSolBlank(false)
    setSolNameExists(false)
  }

  const cancel = () => {
    setCustNameExists(false)
    setName('')
    setNameSolutionEmpty(false)
    resetSolution()
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setNameSolutionEmpty(false)
    const selectedValue = e.target.value
    setSelected(selectedValue)
    selectedValue === 'new' ? setShow(true) : setShow(false)
  }

  const firstUpper = newSolution.charAt(0).toUpperCase() + newSolution.slice(1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(fetchCustomers())
    const lower = solutions!.map(s => s.toLowerCase())
    const dup = (newS: string) => lower.includes(newS)
    if (name.trim().length < 4 || selected === 'choose') {
      setNameSolutionEmpty(true)
    } else if (customerNames.map(c => c.toLowerCase()).includes(name.toLowerCase())) {
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
    setNameSolutionEmpty(false)
  }

  const addSolution = async (e: FormEvent) => {
    e.preventDefault()
    if (solutions) {
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
          setNewSolution('')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  if (isLoading) return 'Loading...'

  return (
    <div className="mt-6 mx-auto place-self-center w-full sm:w-[400px]  flex flex-col ">
      {/* <QueryPlayground /> */}
      {/* <QueryCustPlayground /> */}
      {/* {JSON.stringify(solutions)} */}
      <form onSubmit={handleSubmit} className="z-[3]">
        <fieldset className="p-6 bg-blue-100 border border-blue-300">
          <legend>Add Customer</legend>
          <TextInputCol name="name" value={name} required onChange={handleNameChange} />
          <SelectSolution
            selected={selected}
            solutions={solutions}
            handleSelect={handleSelect}
          />
          <SubmitReset cancel={cancel} handleSubmit={handleSubmit} />
        </fieldset>
      </form>
      {/* {show && ( */}
      <div
        className={`-translate-y-40 transition-transform ${
          show && '-translate-y-[1.5rem]'
        }`}
      >
        <AddSolution
          newSolution={newSolution}
          handleSolChange={handleSolChange}
          newSolBlank={newSolBlank}
          solNameExists={solNameExists}
          addSolution={addSolution}
          newSolErr={newSolErr}
          reset={resetSolution}
        />
        {custNameExists && <Error item={name} />}
        {solNameExists && <Error item={newSolution} />}
        {nameSolutionEmpty && <Error both={'name'} />}
        {/* <Error item={name} />
        <Error item={newSolution} />
        <Error item={'name'} /> */}
      </div>
      {/* )} */}

      {added && <AddedSuccessfully newCust={newCust} newId={newId} />}
    </div>
  )
}

export default AddCustomer
