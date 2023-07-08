import React from 'react'

const page = () => {
  return (
    <>
      <div className="item">
        <label htmlFor="username">username</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        <input type="text" />
      </div>
    </>
  )
}

export default page
