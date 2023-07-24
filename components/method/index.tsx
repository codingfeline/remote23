// prettier-ignore
import { Copy, Edit, Plus, UserPass, useAppDispatch, increment, MethodInfoType, useState, Show, Hide } from '@components'
import { setCopy, removeCopy } from '@redux/features/copy/copySlice'

const method = ({ method }: { method: MethodInfoType[] }) => {
  const [copyStatus, setcopyStatus] = useState<string | null>(null)
  const [showMethod, setshowMethod] = useState(true)

  const dispatch = useAppDispatch()

  const displayTimer = (txt: string) => {
    dispatch(setCopy(txt))
    setTimeout(() => {
      dispatch(removeCopy())
    }, 1000)
  }

  return (
    <div className="method bg-yellow-100">
      <div className="groupMaster group" onClick={() => setshowMethod(prev => !prev)}>
        {showMethod ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub"> Method</span>
      </div>
      <div className={`transIn ${!showMethod && 'transOut'}`}>
        {method.map(meth => (
          <div key={meth._id} className=" bg-yellow-100 sub">
            <div className="flex justify-between">
              <Edit />

              <Plus onClick={() => dispatch(increment())} />
            </div>
            <div className="item">
              <label htmlFor="name">name</label>
              <input type="text" id="name" value={meth.methodName} readOnly />
            </div>
            <div className="item">
              <label htmlFor="url">URL</label>
              <input type="text" value={meth.url} readOnly />
              <Copy onClick={() => navigator.clipboard.writeText(meth.url)} />
            </div>
            <UserPass username={meth.username} password={meth.password} />
            <div className="item">
              <label htmlFor="notes"></label>
              <textarea
                value={meth.notes}
                name=""
                id="notes"
                cols={30}
                rows={3}
                readOnly
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default method
