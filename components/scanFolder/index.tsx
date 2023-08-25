//prettier-ignore
import { UserPass, ScanFolderType, useState, ToggleHook, Plus, Edit } from '@components'
import { useRouter } from 'next/navigation'

const index = ({ scanFolder, cid }: { scanFolder: ScanFolderType[]; cid: string }) => {
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
        length={scanFolder.length}
        compo="addDevice"
        cid={cid}
      />
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {scanFolder.map(scan => (
          <div key={scan._id} className="sub">
            <div className="bg-orange-100">
              <div className="flex justify-between">
                <Edit onClick={() => router.push(`/editScanFolder/${cid}/${scan._id}`)} />
              </div>
              <div className="item">
                <label htmlFor="make">make</label>
                <input type="text" value={scan.hostname} readOnly />
                {space}
              </div>
              <UserPass username={scan.username} password={scan.password} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default index
