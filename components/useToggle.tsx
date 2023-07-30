import { Show, Hide, Plus, Link, useState } from '@components'

interface ToggleHookProps {
  onShowChange: (show: boolean) => void
  name: string
  length: number
  compo: string
}

const ToggleHook: React.FC<ToggleHookProps> = ({ onShowChange, name, length, compo }) => {
  const [show, setShow] = useState<boolean>(true)

  const handleShowChange = () => {
    const updatedShow = !show
    setShow(updatedShow)
    onShowChange(updatedShow) // Call the callback with the updated show value
  }
  const link = JSON.parse(localStorage.getItem('_id') || '')

  const add = (
    <Link href={`/${compo}/${link}`}>
      <Plus title={`Add new ${name}`} />
    </Link>
  )

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
            <span className={`groupSub  ${show ? ' tracking-[5px]' : ' tracking-wide'}`}>
              {name}
            </span>
          </div>
          {add}
        </>
      ) : (
        <> {add}</>
      )}
    </div>
  )
}

export default ToggleHook
