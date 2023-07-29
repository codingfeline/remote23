import React, { useState } from 'react'
import { Show, Hide, Plus } from '@components'

interface ToggleHookProps {
  onShowChange: (show: boolean) => void
  name: string
  length: number
}

const ToggleHook: React.FC<ToggleHookProps> = ({ onShowChange, name, length }) => {
  const [show, setShow] = useState<boolean>(true)

  const handleShowChange = () => {
    const updatedShow = !show
    setShow(updatedShow)
    onShowChange(updatedShow) // Call the callback with the updated show value
  }

  return (
    <div
      className={`flex justify-between items-center px-2 pb-0 ${
        show && ' border border-b-0'
      }`}
    >
      {length > 0 ? (
        <>
          <div className="groupMaster group" onClick={handleShowChange}>
            {show ? (
              <Show className="groupSub -translate-x-1" />
            ) : (
              <Hide className="groupSub translate-x-0" />
            )}
            <span className={`groupSub ${show ? 'translate-x-2' : 'translate-x-1'}`}>
              {name}
            </span>
          </div>
          <Plus title={`Add new ${name}`} />
        </>
      ) : (
        <>
          <Plus title={`Add a ${name}`} />
          {name}
        </>
      )}
    </div>
  )
}

export default ToggleHook
