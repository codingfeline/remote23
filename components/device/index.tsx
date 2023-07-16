import { UserPass, DevicePasswordType, useState, Show, Hide } from '@components'

const index = ({ device }: { device: DevicePasswordType[] }) => {
  const [showDevice, setshowDevice] = useState(true)
  return (
    <div className="device">
      <div className="groupMaster group" onClick={() => setshowDevice(prev => !prev)}>
        {showDevice ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Device</span>
      </div>
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {device.map(dev => (
          <div className="bg-orange-100 sub">
            <div className="item">
              <label htmlFor="make">make</label>
              <input type="text" value={dev.make} />
            </div>
            <UserPass username={dev.username} password={dev.password} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default index
