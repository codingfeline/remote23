import React, { useState } from 'react'
import { Copy, Check } from '@components'

const useCopyHook = (data: string) => {
  const [display, setDisplay] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data)
    setDisplay(!display)
    setTimeout(() => {
      setDisplay(display)
    }, 1500)
  }

  return (
    <>
      <input type="text" value={data} readOnly />
      {!display ? <Copy onClick={handleCopy} /> : <Check />}
    </>
  )
}

export default useCopyHook
