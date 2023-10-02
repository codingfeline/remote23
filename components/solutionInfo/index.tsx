//prettier-ignore
import { UserPass, useState, ToggleHook, Plus, Edit, SolutionInfoType, URL, useRouter } from '@components'

const page = ({ solution, cid }: { solution: SolutionInfoType[]; cid: string }) => {
  const router = useRouter()
  const [showServer, setshowServer] = useState(true)
  const handleShowChange = (show: boolean) => {
    setshowServer(show)
  }

  return (
    <div className="solution bg-cyan-100 border-cyan-400">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Solution Info"
        length={solution.length}
        compo="addSolution"
        cid={cid}
      />
      <div className={`transIn ${!showServer && 'transOut'}`}>
        {solution.map(serv => {
          const space = <Plus className="text-cyan-100 hover:text-cyan-100 disabled" />
          const id = serv._id
          return (
            <div key={serv._id} className="sub">
              <div className=" bg-cyan-100">
                <div className="flex justify-between">
                  <Edit onClick={() => router.push(`/editSolution/${cid}/${id}`)} />
                </div>
                <div className="item">
                  <label htmlFor="name">name</label>
                  <input type="text" value={serv.name} readOnly />

                  {space}
                </div>
                <URL url={serv.portal} />
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
