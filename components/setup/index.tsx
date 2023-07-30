import { ServerSetupType, useState, Show, Hide } from '@components'
import ToggleHook from '@components/useToggle'

const index = ({ setup }: { setup: ServerSetupType[] }) => {
  const [showSetup, setshowSetup] = useState(setup.length ? true : false)

  const handleShowChange = (show: boolean) => {
    setshowSetup(show)
  }

  return (
    <div className="setup bg-purple-100 border-purple-300">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Screenshots"
        length={setup.length}
        compo="addScreenshot"
      />
      <div className={`transIn ${!showSetup && 'transOut'}`}>
        {setup.map(set => (
          <div key={set._id} className="sub">
            <div className="bg-purple-100">
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default index

// _id, comment, screenshot, path
