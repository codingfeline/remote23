import React from 'react'

const SolutionExists = ({ newS }: { newS: string }) => {
  return (
    <div className="item">
      <label htmlFor=""></label>
      <div className="flex grow gap-1 justify-center mt-2 text-red-400">
        <i>{newS}</i> already exists
      </div>
    </div>
  )
}

export default SolutionExists
