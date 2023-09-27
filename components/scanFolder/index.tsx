//prettier-ignore
import { UserPass, ScanFolderType, useState, ToggleHook, Plus, Edit } from '@components'
import { useRouter } from 'next/navigation'

const index = ({ scanFolder, cid }: { scanFolder: ScanFolderType[]; cid: string }) => {
  const router = useRouter()
  const [showDevice, setshowDevice] = useState(true)

  const handleShowChange = (show: boolean) => {
    setshowDevice(show)
  }

  const space = <Plus className="text-indigo-100 hover:text-indigo-100 disabled" />

  return (
    <div className="device bg-indigo-100 border-indigo-300">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Scan-to-folder"
        length={scanFolder.length}
        compo="addScanFolder"
        cid={cid}
      />
      <div className={`transIn ${!showDevice && 'transOut'}`}>
        {scanFolder.map(scan => (
          <div key={scan._id} className="sub">
            <div className="bg-indigo-100">
              <div className="flex justify-between">
                <Edit onClick={() => router.push(`/editScanFolder/${cid}/${scan._id}`)} />
              </div>
              <div className="item">
                <label htmlFor="hostname">hostname</label>
                <input type="text" value={scan.hostname} readOnly />
                {space}
              </div>
              <div className="item">
                <label htmlFor="subFolder">sub folder</label>
                <input type="text" value={scan.folder} readOnly />
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
