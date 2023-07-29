import { UserPassType } from '@components'
import useCopyHook from './useCopyHook'

const page = (user: UserPassType) => {
  const Username = useCopyHook(user.username)
  const Password = useCopyHook(user.password)

  return (
    <>
      <div className="item">
        <label htmlFor="username">username</label>
        {Username}
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        {Password}
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
