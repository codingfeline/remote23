import { UserPassType } from '@components'

const page = (user: UserPassType) => {
  return (
    <>
      <div className="item">
        <label htmlFor="username">username</label>
        <input type="text" value={user.username} />
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        <input type="text" value={user.password} />
      </div>
    </>
  )
}

export default page
