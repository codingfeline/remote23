// prettier-ignore
import { Edit, UserPass, MethodInfoType, useState, ToggleHook, useEffect } from '@components'
import URL from '@components/Url'
import { useRouter } from 'next/navigation'

const method = ({ method, cid }: { method: MethodInfoType[]; cid: string }) => {
  const router = useRouter()
  const [showMethod, setshowMethod] = useState(true)

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
        cid={cid}
      />
      <div className={`transIn ${!showMethod && 'transOut'}`}>
        {method.map(meth => {
          const id = meth._id || ''
          const space = (
            <Edit className="text-yellow-100 hover:text-yellow-100 disabled" />
          )

          return (
            <div key={meth._id} className="sub">
              <div className=" bg-yellow-100">
                <div className="flex justify-between">
                  <Edit onClick={() => router.push(`/editMethod/${cid}/${id}`)} />
                  <span className="tracking-[4px] bold">{meth.methodName}</span>
                </div>
                <URL url={meth.url} />
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
