import React from 'react'

type ErrorProp = {
  name?: string
  both?: string
  item?: string
}

const ItemExists = ({ name, both, item }: ErrorProp) => {
  return (
    <div className="flex justify-center ">
      {/* <label htmlFor=""></label> */}
      <div className="flex w-2/3 justify-center text-center mt-2 text-red-400 bg-red-100 rounded-md p-2 border border-red-200">
        {item && (
          <>
            <i>{item}</i>&nbsp;already exists
          </>
        )}
        {both && 'please fill in both and name must be more than 3 characters'}
      </div>
    </div>
  )
}

export default ItemExists
