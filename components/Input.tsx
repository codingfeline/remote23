import React from 'react'

type InputProps = {
  value: string
  name: string
  type?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const Input = ({ name, type = 'text', value, handleChange }: InputProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* <label htmlFor={name}>{name}</label> */}
        <input type="text" value={value} onChange={handleChange} required />
      </div>
    </>
  )
}

export default Input
