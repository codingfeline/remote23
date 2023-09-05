import { Cross } from '@components'

const SubmitButtonCol = () => {
  return (
    <div className="flex">
      {/* <label htmlFor=""></label> */}
      <button
        type="submit"
        className="bg-gray-100 border border-gray-300 hover:border-gray-400 hover:bg-gray-100"
      >
        Submit
      </button>
    </div>
  )
}

export default SubmitButtonCol
