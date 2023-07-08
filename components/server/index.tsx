import { UserPass } from '@components'
import React from 'react'

const page = () => {
  return (
    <div className="server">
      <h4>server</h4>
      <div className="item">
        <label htmlFor="hostname">hostname</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="ip">IP</label>
        <input type="text" />
      </div>
      <UserPass />
    </div>
  )
}

export default page
