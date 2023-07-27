import React from 'react'

type InputProps = {
  value: string
  name: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const TextInput: React.FC<InputProps> = ({
  name,
  type = 'text',
  value,
  onChange,
  required = false,
}) => {
  return (
    <>
      <div className="item">
        <label htmlFor={name}>{name}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  )
}

export default TextInput
