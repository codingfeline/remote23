'use client'

import { useState } from 'react'
import Input from '@components/Input'
import { solutions, vpns } from '@utils/helpers'

const AddCustomer = () => {
  const [name, setName] = useState<string>('')
  const [solution, setSolution] = useState<string>('')
  const [method, setMethod] = useState<string>('')
  const [itName, setItName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [tel, setTel] = useState<string>('')
  const [data, setData] = useState({
    name1: '',
    solution1: '',
    method1: '',
    itName1: '',
  })
  vpns.sort()

  const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value)
  }

  return (
    <>
      <h3>AddCustomer</h3>
      <form action="">
        <fieldset>
          <legend>Customer</legend>
          <Input name="name" value={name} handleChange={e => setName(e.target.value)} />
          <div className="item">
            <label htmlFor="solution">solution</label>
            <select
              name="solution"
              id="solution"
              onChange={e => setSolution(e.target.value)}
            >
              <option value="">Choose one</option>
              {solutions.map(solution => (
                <option key={solution} value={solution}>
                  {solution}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
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
        )}
        <div className="flex justify-around">
          <button>Submit</button>
        </div>
      </form>
      <div>
        {name}, {solution}, {method}
      </div>
    </>
  )
}

export default AddCustomer
