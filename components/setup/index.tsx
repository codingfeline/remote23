import { ServerSetupType, useState, Show, Hide } from '@components'

const index = ({ setup }: { setup: ServerSetupType[] }) => {
  const [showSetup, setshowSetup] = useState(setup.length ? true : false)

  return (
    <div className="setup bg-purple-100">
      <div className="groupMaster group" onClick={() => setshowSetup(prev => !prev)}>
        {showSetup ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Screenshots</span>
      </div>
      <div className={`transIn ${!showSetup && 'transOut'}`}>
        {setup.map(set => (
          <div key={set._id} className="bg-purple-100 sub">
            <div className="item">
              <label htmlFor="comment">comment</label>
              <input type="text" value={set.comment} readOnly />
            </div>
            <div className="item"></div>
            <label htmlFor="screenshot">screenshot</label>
            <img
              src={`https://remoteapi.nazs.net/screenshots/${set.screenshot}`}
              alt="screenshot"
              width={200}
              height="auto"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default index

// _id, comment, screenshot, path
