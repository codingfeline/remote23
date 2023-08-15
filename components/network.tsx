// prettier-ignore
import { Edit, UserPass, MethodInfoType, useState, ToggleHook, useEffect } from '@components'
import URL from '@components/Url'
import { useRouter } from 'next/navigation'

const NetworkConfig = () => {
  const router = useRouter()
  const [showMethod, setshowMethod] = useState(true)

  const handleShowChange = (show: boolean) => {
    setshowMethod(show)
  }
  return (
    <div className="method bg-yellow-100  border-yellow-400">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Network Config"
        compo="addMethod"
        length={1}
      />
      <div className={`transIn ${!showMethod && 'transOut'}`}>
        <div className="sub">
          <div className=" bg-yellow-100">
            <div className="flex justify-between">
              <Edit onClick={() => router.push(`/editMethod/2/2`)} />
              <span className="tracking-[4px] bold">{'Network'}</span>
            </div>
            <div className="item">
              <label htmlFor="domain">domain</label>
              <input type="text" />
            </div>
            <div className="item">
              <label htmlFor="dns">dns</label>
              <div className="flex flex-col">
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkConfig
