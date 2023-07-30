// prettier-ignore
import { Edit, UserPass, MethodInfoType, useState, ToggleHook, useCopyHook, Plus } from '@components'

const method = ({ method }: { method: MethodInfoType[] }) => {
  const [showMethod, setshowMethod] = useState<boolean>(method.length ? true : false)

  const handleShowChange = (show: boolean) => {
    setshowMethod(show)
  }

  return (
    <div className="method bg-yellow-100  border-yellow-400">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Method"
        length={method.length}
        compo="addMethod"
      />
      <div className={`transIn ${!showMethod && 'transOut'}`}>
        {method.map(meth => {
          const Url = useCopyHook(meth.url)
          const space = (
            <Plus className="text-yellow-100 hover:text-yellow-100 disabled" />
          )

          return (
            <div className="sub">
              <div key={meth._id} className=" bg-yellow-100">
                <div className="flex justify-between">
                  <Edit />
                </div>
                <div className="item">
                  <label htmlFor="name">name</label>
                  <input type="text" id="name" value={meth.methodName} readOnly />
                  {space}
                </div>
                <div className="item">
                  <label htmlFor="url">URL</label>
                  {Url}
                </div>
                <UserPass username={meth.username} password={meth.password} />
                <div className="item">
                  <label htmlFor="notes">note</label>
                  <textarea
                    value={meth.notes}
                    name=""
                    id="notes"
                    cols={30}
                    rows={3}
                    readOnly
                  ></textarea>
                  {space}
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
