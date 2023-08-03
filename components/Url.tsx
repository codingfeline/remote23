import { UserPassType, useCopyHook } from '@components'

type UrlType = {
  url: string
}
const URL = (url: UrlType) => {
  const Url = useCopyHook(url.url)

  return (
    <>
      <div className="item">
        <label htmlFor="url">url</label>
        {Url}
      </div>
    </>
  )
}

export default URL
