import React from 'react'

const ItemExists = ({ item }: { item: string }) => {
  return (
    <div className="flex justify-center ">
      {/* <label htmlFor=""></label> */}
      <div className="flex  justify-center mt-2 text-red-400 bg-red-100 rounded-md p-2 border border-red-200">
        <i>{item}</i>
      </div>
    </div>
  )
}

export default ItemExists
