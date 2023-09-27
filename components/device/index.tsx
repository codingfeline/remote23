//prettier-ignore
import { UserPass, DevicePasswordType, useState, ToggleHook, Plus, Edit } from '@components'
import { useRouter } from 'next/navigation'

const index = ({ device, cid }: { device: DevicePasswordType[]; cid: string }) => {
  const router = useRouter()
  const [showDevice, setshowDevice] = useState(true)

  const handleShowChange = (show: boolean) => {
    setshowDevice(show)
  }

  const space = <Plus className="text-orange-100 hover:text-orange-100 disabled" />

  return (
    <div className="device bg-orange-100 border-orange-300">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Device"
        length={device.length}
        compo="addDevice"
        cid={cid}
      />
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {device.map(dev => (
          <div key={dev._id} className="sub">
            <div className="bg-orange-100">
              <div className="flex justify-between">
                <Edit onClick={() => router.push(`/editDevice/${cid}/${dev._id}`)} />
              </div>
              <div className="item">
                <label htmlFor="make">make</label>
                <input type="text" value={dev.make} readOnly />
                {space}
              </div>
              <UserPass username={dev.username} password={dev.password} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default index
