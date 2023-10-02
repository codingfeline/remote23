//prettier-ignore
import { UserPass, ServerType, useState, ToggleHook, Plus, Edit, useRouter } from '@components'

const page = ({ server, cid }: { server: ServerType[]; cid: string }) => {
  const router = useRouter()
  const [showServer, setshowServer] = useState(true)
  const handleShowChange = (show: boolean) => {
    setshowServer(show)
  }

  return (
    <div className="server bg-lime-100 border-lime-400">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Server"
        length={server.length}
        compo="addServer"
        cid={cid}
      />
      <div className={`transIn ${!showServer && 'transOut'}`}>
        {server.map(serv => {
          const space = <Plus className="text-lime-100 hover:text-lime-100 disabled" />
          const id = serv._id
          return (
            <div key={serv._id} className="sub">
              <div className=" bg-lime-100">
                <div className="flex justify-between">
                  <Edit onClick={() => router.push(`/editServer/${cid}/${id}`)} />
                </div>
                <div className="item">
                  <label htmlFor="name">name</label>
                  <input type="text" value={serv.name} readOnly />

                  {space}
                </div>
                <div className="item">
                  <label htmlFor="ip">IP</label>
                  <input type="text" value={serv.ip} readOnly />
                  {space}
                </div>
                <UserPass username={serv.username} password={serv.password} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
