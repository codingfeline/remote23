import { UserPass, ServerType, useState, ToggleHook } from '@components'

const page = ({ server }: { server: ServerType[] }) => {
  const [showServer, setshowServer] = useState(server.length ? true : false)

  const handleShowChange = (show: boolean) => {
    setshowServer(show)
  }

  return (
    <div className="server bg-lime-100 border-lime-400">
      <ToggleHook onShowChange={handleShowChange} name="Server" length={server.length} />
      <div className={`transIn ${!showServer && 'transOut'}`}>
        {server.map(serv => (
          <div className="sub">
            <div key={serv._id} className=" bg-lime-100">
              <div className="item">
                <label htmlFor="name">name</label>
                <input type="text" value={serv.name} readOnly />
              </div>
              <div className="item">
                <label htmlFor="ip">IP</label>
                <input type="text" value={serv.ip} readOnly />
              </div>
              <UserPass username={serv.username} password={serv.password} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
