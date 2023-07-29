import { UserPass, DevicePasswordType, useState, ToggleHook } from '@components'

const index = ({ device }: { device: DevicePasswordType[] }) => {
  const [showDevice, setshowDevice] = useState(device.length ? true : false)

  const handleShowChange = (show: boolean) => {
    setshowDevice(show)
  }

  return (
    <div className="device bg-orange-100 border-orange-300">
      <ToggleHook onShowChange={handleShowChange} name="Device" length={device.length} />
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {device.map(dev => (
          <div className="sub">
            <div key={dev._id} className="bg-orange-100">
              <div className="item">
                <label htmlFor="make">make</label>
                <input type="text" value={dev.make} readOnly />
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
