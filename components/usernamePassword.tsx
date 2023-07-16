import { Copy, UserPassType, useState } from '@components'
import { useAppDispatch } from '@components'

const page = (user: UserPassType) => {
  const dispatch = useAppDispatch()
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
        <input type="text" value={user.username} readOnly />
        <Copy onClick={() => navigator.clipboard.writeText(user.username)} />
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        <input type="text" value={user.password} readOnly />
        <Copy onClick={() => navigator.clipboard.writeText(user.password)} />
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
