import React from 'react'

const FormParent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-6 place-self-center w-full sm:w-[450px]  flex flex-col ">
      <div className="flex justify-center w-full">{children}</div>
    </div>
  )
}

export default FormParent
