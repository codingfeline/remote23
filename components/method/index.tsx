import { UserPass } from '@components'
import React from 'react'

const page = () => {
  return (
    <div className="method">
      <h4>method</h4>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="url">URL</label>
        <input type="text" />
      </div>
      <UserPass />
    </div>
  )
}

export default page
