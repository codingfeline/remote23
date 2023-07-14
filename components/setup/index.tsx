import { ServerSetupType } from '@utils/types/customer'

const index = (setup: ServerSetupType) => {
  return (
    <>
      <div className="item">
        <label htmlFor="comment">comment</label>
        <input type="text" value={setup.comment} />
      </div>
      <div className="item">
        <label htmlFor="screenshot">screenshot</label>
        <img
          src={`https://remoteapi.nazs.net/screenshots/${setup.screenshot}`}
          alt="screenshot"
          width={200}
          height="auto"
        />
      </div>
    </>
  )
}

export default index

// _id, comment, screenshot, path
