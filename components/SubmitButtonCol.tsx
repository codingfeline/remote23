import { Cross, Plus } from '@components'
import { GrSend } from 'react-icons/gr'
import { RiDeleteBinLine, RiDeleteBin6Line } from 'react-icons/ri'

type submitProp = {
  cancel: () => void
  name: string
}

const SubmitButtonCol = ({ cancel, name }: submitProp) => {
  return (
    <div className="flex gap-1">
      {/* <label htmlFor=""></label> */}
      <button
        type="submit"
        className="bg-gray-100 border border-gray-300 hover:border-gray-400 hover:bg-gray-100"
      >
        Submit
      </button>
      <RiDeleteBin6Line onClick={() => cancel} /> {name}
      <GrSend />
    </div>
  )
}

export default SubmitButtonCol
