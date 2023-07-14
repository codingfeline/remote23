import { Copy, UserPassType, useState } from '@components'

const page = (user: UserPassType) => {
  const [copy, setCopy] = useState<string | null>(null)
  const displayTimer = (txt: string) => {
    setCopy(txt)
    setTimeout(() => {
      setCopy('')
    }, 3000)
  }
  return (
    <>
      <div className="item">
        <label htmlFor="username">username</label>
        <input type="text" value={user.username} />

        <Copy onClick={() => displayTimer(user.username)} />
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        <input type="text" value={user.password} />
        <Copy onClick={() => displayTimer(user.password)} />
      </div>
    </>
  )
}

export default page

// possible usage
{
  /* <UserPass
        username={method.username}
        password={method.password}
        handleClick={(e, item) => displayTimer(item)}
      /> */
}
