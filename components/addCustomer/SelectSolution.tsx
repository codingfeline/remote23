import React from 'react'

type SelectPropType = {
  selected: string
  solutions: string[]
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectSolution = ({ selected, handleSelect, solutions }: SelectPropType) => {
  return (
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
  )
}

export default SelectSolution
