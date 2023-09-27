import React, { useState, FC } from 'react'

// Child component
interface ChildProps {
  updateParentProperty: (value: string) => void
}

const Child: FC<ChildProps> = ({ updateParentProperty }) => {
  const handleClick = () => {
    const newValue = 'New Value from Child'
    updateParentProperty(newValue)
  }

  return <button onClick={handleClick}>Change Parent Property</button>
}

// Parent component
const Parent = () => {
  const [parentProperty, setParentProperty] = useState('Initial Value')

  const handleChildClick = (newValue: string) => {
    // This function is called by the child component with the new value.
    setParentProperty(newValue)
  }

  return (
    <div>
      <p>Parent Property: {parentProperty}</p>
      <Child updateParentProperty={handleChildClick} />
    </div>
  )
}

export default Parent
