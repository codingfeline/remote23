import React from 'react'

const EditFormLabel = ({ cust, label }: { cust: string; label: string }) => {
  return (
    <div className="mb-2 place-self-center">
      <span className="bg-indigo-400 rounded-l-md p-2 py-3">{cust}</span>
      <span className="bg-indigo-300 rounded-r-md p-2 py-3">{label}</span>
    </div>
  )
}

export default EditFormLabel
