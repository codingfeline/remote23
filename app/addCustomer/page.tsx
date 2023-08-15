'use client'

import { useState, useEffect } from 'react'
import Input from '@components/Input'
import axios from 'axios'
import { TextInput } from '@components'
import { useRouter } from 'next/navigation'
import { useAppDispatch, fetchCustomers } from '@components'

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
  const [newSolution, setNewSolution] = useState('')
  const [selected, setSelected] = useState('choose')
  const [added, setAdded] = useState(false)
  const [newId, setNewId] = useState('')
  const [newCust, setNewCust] = useState('')

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    try {
      const response = await fetch(`http://localhost:3121/api/solutions`)
      if (response.ok) {
        const data = await response.json()
        const names = data.map((s: solutionType) => s.name)
        console.log(names)
        setSolutions(names.sort())
      } else {
        console.error('Failed to fetch data from API')
      }
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
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
    setShow(false)
    setSelected('choose')
  }

  const addSolution = (e: React.FormEvent) => {
    e.preventDefault()
    const lower = solutions.map(s => s.toLocaleLowerCase())
    if (lower.includes(newSolution.toLowerCase())) {
      console.log('name exists')
    } else {
      const url = `http://localhost:3121/api/solutions`
      axios.post(url, { name: newSolution }).then(res => {
        console.log(res)
        if (res.statusText === 'Created') {
          console.log('ok')
          fetchSolutions()
          setSelected(newSolution)
          setShow(false)
        }
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    axios
      .post('http://localhost:3121/api/customers', { name: name, solution: selected })
      .then(res => {
        console.log(res)
        if (res.statusText === 'Created') {
          console.log(res)
          setNewId(res.data._id)
          setAdded(true)
          dispatch(fetchCustomers())
          setNewCust(name) //to display name upon submission

          // resetting form
          setName('')
          setSelected('')
        }
      })
  }

  return (
    <>
      <h3>AddCustomer</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Customer</legend>

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
              <option value="new">add new</option>
            </select>
          </div>

          {show && (
            <div className="w-full flex justify-center items-center">
              <form action="" className="bg-lime-100 w-1/2 p-6 rounded-md">
                <Input
                  name="name"
                  value={newSolution}
                  handleChange={e => setNewSolution(e.target.value)}
                />
                <button onClick={addSolution}>Add</button>
                <button onClick={() => cancel()}>Cancel</button>
              </form>
            </div>
          )}
        </fieldset>
        <div className="flex justify-around">
          <button>Submit</button>
        </div>
      </form>
      {added && (
        <div className="flex flex-col justify-center items-center w-1/3 m-auto mt-8 bg-yellow-100 p-3 rounded-md">
          <div>{newCust} added</div>
          <button className="" onClick={() => router.push(`/cust/${newId}`)}>
            go to {newCust}
          </button>
        </div>
      )}
    </>
  )
}

export default AddCustomer

{
  /* <fieldset>
              <legend>Remote Method</legend>
              <div className="item flex flex-wrap" onChange={radioChange}>
                {vpns.map(vpn => (
                  <label htmlFor={vpn} className="radioLabel">
                  <input type="radio" id={vpn} name="method" value={vpn} />
                  {vpn}
                  </label>
                  ))}
                  </div>
            </fieldset>
            {method === 'TeamViewer' && (
              <fieldset>
              <legend>IT Contact</legend>
              <Input
              name="IT Name"
              value={itName}
              handleChange={e => setItName(e.target.value)}
              />
              <Input name="tel" value={tel} handleChange={e => setTel(e.target.value)} />
              <Input
              name="email"
              value={email}
              handleChange={e => setEmail(e.target.value)}
              />
              </fieldset> 
            )} */
}
