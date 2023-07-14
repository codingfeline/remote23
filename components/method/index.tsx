// prettier-ignore
import { Copy, Edit, Plus, UserPass, useAppDispatch, increment, MethodInfoType, useState } from '@components'

const page = (method: MethodInfoType) => {
  const [copyStatus, setcopyStatus] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const displayTimer = (txt: string) => {
    navigator.clipboard.writeText(txt)
    setcopyStatus(txt)
    setTimeout(() => {
      setcopyStatus('')
    }, 700)
  }
  return (
    <div className="method bg-yellow-100">
      <div className="flex justify-between">
        <Edit />
        {/* DISPLAY COPIED CLIPBOARD */}
        <span className={`transition-opacity ${copyStatus ? 'opacity-1' : ' opacity-0'}`}>
          {copyStatus && (
            <>
              Copied <i>{copyStatus}</i>
            </>
          )}
        </span>
        <Plus onClick={() => dispatch(increment())} />
      </div>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" id="name" value={method.methodName} />
      </div>
      <div className="item">
        <label htmlFor="url">URL</label>
        <input type="text" value={method.url} />
        <Copy onClick={() => displayTimer(method.url)} />
      </div>
      <div className="item">
        <label htmlFor="username">username</label>
        <input type="text" value={method.username} />

        <Copy onClick={() => displayTimer(method.username)} />
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        <input type="text" value={method.password} />
        <Copy onClick={() => displayTimer(method.password)} />
      </div>
      <div className="item">
        <label htmlFor="notes"></label>
        <textarea name="" id="notes" cols={30} rows={3}>
          {method.notes}
        </textarea>
      </div>
    </div>
  )
}

export default page
