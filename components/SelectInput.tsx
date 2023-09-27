import React from 'react'

interface SelectInputProps {
  label: string
  name: string
  value: string
  options: string[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
