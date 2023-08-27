//prettier-ignore
import { UserPass, ScanEmailType, useState, ToggleHook, Plus, Edit } from '@components'
import { useRouter } from 'next/navigation'

const index = ({ scanEmail, cid }: { scanEmail: ScanEmailType[]; cid: string }) => {
  const router = useRouter()
  const [showDevice, setshowDevice] = useState(true)

  const handleShowChange = (show: boolean) => {
    setshowDevice(show)
  }

  const space = <Plus className="text-red-100 hover:text-red-100 disabled" />

  return (
    <div className="device bg-red-100 border-red-300">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Scan-to-email"
        length={scanEmail.length}
        compo="addScanEmail"
        cid={cid}
      />
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {scanEmail.map(scan => (
          <div key={scan._id} className="sub">
            <div className="bg-red-100">
              <div className="flex justify-between">
                <Edit onClick={() => router.push(`/editScanEmail/${cid}/${scan._id}`)} />
              </div>
              <div className="item">
                <label htmlFor="hostname">hostname</label>
                <input type="text" value={scan.hostname} readOnly />
                {space}
              </div>
              <UserPass username={scan.username} password={scan.password} />
              <div className="item">
                <label htmlFor="port">port</label>
                <input type="text" value={scan.port} readOnly />
                {space}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default index
