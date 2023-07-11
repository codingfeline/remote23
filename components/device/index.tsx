import { UserPass, DevicePasswordType } from '@components'

const index = (user: DevicePasswordType) => {
  return (
    <div className="device">
      <h4>device</h4>
      <div className="item">
        <label htmlFor="make">make</label>
        <input type="text" />
      </div>
      <UserPass username={user.username} password={user.password} />
    </div>
  )
}

export default index
