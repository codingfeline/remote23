'use client'

import { useState } from 'react'
import Input from '@components/Input'
import { solutions, vpns } from '@utils/helpers'

const AddCustomer = () => {
  const [name, setName] = useState<string>('')
  const [solution, setSolution] = useState<string>('')
  const [method, setMethod] = useState<string>('')
  vpns.sort()

  const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value)
  }

  return (
    <>
      <h3>AddCustomer</h3>
      <fieldset>
        <legend>Customer</legend>
        <div className="item">
          <label htmlFor="name">name</label>
          <Input value={name} handleChange={e => setName(e.target.value)} />
        </div>
        <div className="item">
          <label htmlFor="solution">solution</label>
          <select
            name="solution"
            id="solution"
            onChange={e => setSolution(e.target.value)}
          >
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
      <div>
        {name}, {solution}, {method}
      </div>
    </>
  )
}

export default AddCustomer
