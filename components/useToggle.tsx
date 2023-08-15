import { Show, Hide, Plus, Link, useState } from '@components'

interface ToggleHookProps {
  onShowChange: (show: boolean) => void
  name: string
  length?: number
  compo: string
  cid?: string
}

const ToggleHook: React.FC<ToggleHookProps> = ({
  onShowChange,
  name,
  length,
  compo,
  cid,
}) => {
  const [show, setShow] = useState<boolean>(true)

  const handleShowChange = () => {
    const updatedShow = !show
    setShow(updatedShow)
    onShowChange(updatedShow) // Call the callback with the updated show value
  }

  const add = (
    <>
      <Link href={`/${compo}/${cid}`}>
        <Plus title={`Add new ${name}`} />
      </Link>
    </>
  )

  return (
    <div
      className={`flex justify-between items-center px-2 pb-0 ${
        show && ' border border-b-0'
      }`}
    >
      {length !== 0 && (
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
        </>
      )}
      {name === 'Network Config' ? (
        ''
      ) : (
        <div className="flex items-center">
          {add} {name}
        </div>
      )}
    </div>
  )
}

export default ToggleHook
