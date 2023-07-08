import React from 'react'

const page = () => {
  return (
    <div className="contact">
      <h4>contact</h4>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="email">email</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="tel">tel</label>
        <input type="text" />
      </div>
    </div>
  )
}

export default page
