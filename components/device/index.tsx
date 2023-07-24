import { UserPass, DevicePasswordType, useState, Show, Hide } from '@components'

const index = ({ device }: { device: DevicePasswordType[] }) => {
  const [showDevice, setshowDevice] = useState(true)

  return (
    <div className="device bg-orange-100">
      <div className="groupMaster group" onClick={() => setshowDevice(prev => !prev)}>
        {showDevice ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Device</span>
      </div>
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {device.map(dev => (
          <div key={dev._id} className="bg-orange-100 sub">
            <div className="item">
              <label htmlFor="make">make</label>
              <input type="text" value={dev.make} readOnly />
            </div>
            <UserPass username={dev.username} password={dev.password} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default index
