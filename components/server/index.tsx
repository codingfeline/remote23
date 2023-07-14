import { UserPass, ServerType } from '@components'

const page = (server: ServerType) => {
  return (
    <div className="server bg-lime-100">
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" value={server.name} />
      </div>
      <div className="item">
        <label htmlFor="ip">IP</label>
        <input type="text" value={server.ip} />
      </div>
      <UserPass username={server.username} password={server.password} />
    </div>
  )
}

export default page
