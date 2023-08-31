import React from 'react'
import { useRouter } from 'next/navigation'

const AddedSuccessfully = ({ newCust, newId }: { newCust: string; newId: string }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center w-2/3 m-auto mt-8 bg-blue-100 p-5 rounded-md">
      <div>
        <i>{newCust}</i> added successfully
      </div>
      <button className="m-2" onClick={() => router.push(`/cust/${newId}`)}>
        View <i>{newCust}</i>
      </button>
    </div>
  )
}

export default AddedSuccessfully
