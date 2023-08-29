'use client'

import { useState, useEffect } from 'react'
import Input from '@components/Input'
// import axios from 'axios'
import axios from '@components/axios'
import { SubmitButton, TextInput } from '@components'
import { useRouter } from 'next/navigation'
import { useAppDispatch, fetchCustomers } from '@components'
import { BiCheckCircle, BiCross } from 'react-icons/bi'
import { RxCrossCircled } from 'react-icons/rx'

type solutionType = {
  _id: string
  name: string
}

const AddCustomer = () => {
  const router = useRouter()
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
  }

  const addSolution = (e: React.FormEvent) => {
    e.preventDefault()
    const lower = solutions.map(s => s.toLocaleLowerCase())
    if (newSolution !== '') {
      if (lower.includes(newSolution.toLowerCase())) {
        console.log('name exists')
      } else {
        const firstUpper = newSolution.charAt(0).toUpperCase() + newSolution.slice(1)
        axios.post('solutions', { name: firstUpper }).then(res => {
          console.log(res)
          if (res.statusText === 'Created') {
            console.log('ok')
            fetchSolutions()
            setSelected(newSolution)
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
    } else if (selected === 'new' && newSolution.length > 0) {
      setNewSolErr(true)
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
                    onChange={e => setNewSolution(e.target.value)}
                    required
                    placeholder={` ${newSolBlank ? ' enter new solution' : ''}`}
                    className={` ${newSolBlank && 'bg-red-200 border border-red-600'}`}
                  />
                </div>
                <div className="flex justify-center items-center p-2">
                  <BiCheckCircle
                    onClick={addSolution}
                    title="Add New Solution"
                    className={`hover:text-green-600 ${
                      newSolErr &&
                      'text-green-600 text-[40px] animate-bounce hover:animate-none'
                    }`}
                  />
                  <RxCrossCircled
                    onClick={cancel}
                    title="Cancel"
                    className="hover:text-red-500"
                  />
                </div>
              </form>
            </div>
          )}
          <SubmitButton />
        </fieldset>
      </form>
      {added && (
        <div className="flex flex-col justify-center items-center w-2/3 m-auto mt-8 bg-blue-100 p-5 rounded-md">
          <div>
            <i>{newCust}</i> added successfully
          </div>
          <button className="m-2" onClick={() => router.push(`/cust/${newId}`)}>
            View <i>{newCust}</i>
          </button>
        </div>
      )}
    </div>
  )
}

export default AddCustomer
