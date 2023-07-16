import { ServerSetupType, useState, Show, Hide } from '@components'

const index = ({ setup }: { setup: ServerSetupType[] }) => {
  const [showSetup, setshowSetup] = useState(true)

  return (
    <div className="setup">
      <div className="groupMaster group" onClick={() => setshowSetup(prev => !prev)}>
        {showSetup ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub">Screenshots</span>
      </div>
      <div className={`transIn ${!showSetup && 'transOut'}`}>
        {setup.map(set => (
          <div className="bg-lime-100 sub">
            <div className="item">
              <label htmlFor="comment">comment</label>
              <input type="text" value={set.comment} />
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
