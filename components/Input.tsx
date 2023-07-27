import React from 'react'

type InputProps = {
  value: string
  name: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
  return (
    <>
      <div className="item">
        <label htmlFor={props.name}>{props.name}</label>
        <input type="text" value={props.value} onChange={props.handleChange} />
      </div>
    </>
  )
}

export default Input
