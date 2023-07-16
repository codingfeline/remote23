import { UserPass, ServerType, useState, Show, Hide } from '@components'

const page = ({ server }: { server: ServerType[] }) => {
  const [showServer, setshowServer] = useState(true)

  return (
    <div className="server">
      <div className="groupMaster group" onClick={() => setshowServer(prev => !prev)}>
        {showServer ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Server</span>
      </div>
      <div className={`transIn ${!showServer && 'transOut'}`}>
        {server.map(serv => (
          <div className=" bg-lime-100 sub">
            <div className="item">
              <label htmlFor="name">name</label>
              <input type="text" value={serv.name} readOnly />
            </div>
            <div className="item">
              <label htmlFor="ip">IP</label>
              <input type="text" value={serv.ip} />
            </div>
            <UserPass username={serv.username} password={serv.password} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
