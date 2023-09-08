import React from 'react'

type SelectSolutionPropType = {
  selected: string
  solutions: string[]
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectSolution = ({
  selected,
  handleSelect,
  solutions,
}: SelectSolutionPropType) => {
  return (
    <div className="flex flex-col">
      {/* <label className="w-full text-center" htmlFor="solution">
        solution
      </label> */}
      <select
        name="solution"
        id="solution"
        onChange={handleSelect}
        value={selected}
        required
      >
        <option value="choose">Choose solution</option>
        {solutions.map((sol, i) => (
          <option key={i} value={sol}>
            {sol}
          </option>
        ))}
        <option value="new">ADD NEW</option>
      </select>
    </div>
  )
}

export default SelectSolution
