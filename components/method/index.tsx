// prettier-ignore
import { Copy, Edit, UserPass, MethodInfoType, useState, ToggleHook } from '@components'

const method = ({ method }: { method: MethodInfoType[] }) => {
  const [showMethod, setshowMethod] = useState<boolean>(method.length ? true : false)
  const handleShowChange = (show: boolean) => {
    setshowMethod(show)
  }

  return (
    <div className="method bg-yellow-100  border-yellow-400">
      <ToggleHook onShowChange={handleShowChange} name="Method" length={method.length} />
      <div className={`transIn ${!showMethod && 'transOut'}`}>
        {method.map(meth => {
          return (
            <div className="sub">
              <div key={meth._id} className=" bg-yellow-100">
                <div className="flex justify-between">
                  <Edit />
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default method
