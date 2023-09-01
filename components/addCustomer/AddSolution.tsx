import { CheckCircle, Cross, ChangeEvent, FormEvent } from '@components'

type PropsType = {
  newSolution: string
  handleSolChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  newSolBlank: boolean
  solNameExists: boolean
  addSolution: (e: FormEvent) => void
  newSolErr: boolean
  cancel: () => void
}

const AddSolution = ({
  newSolution,
  handleSolChange,
  placeholder,
  newSolBlank,
  solNameExists,
  newSolErr,
  cancel,
  addSolution,
}: PropsType) => {
  return (
    <form className={`bg-indigo-200 border border-indigo-300 w-3/5 py-2 rounded-md`}>
      <div className="flex flex-col">
        <input
          type="text"
          value={newSolution}
          onChange={handleSolChange}
          required
          placeholder={placeholder}
          className={` ${
            (newSolBlank || solNameExists) && 'bg-red-200 border border-red-600'
          }`}
        />
      </div>
      <div className="flex justify-center items-center p-2">
        <CheckCircle
          onClick={addSolution}
          title="Add New Solution"
          className={`hover:text-green-600 text-[40px] ${
            newSolErr && 'text-green-600 hover:animate-none motion-safe:animate-bounce'
          }`}
        />
        <Cross onClick={cancel} title="Cancel" className="text-[40px]" />
      </div>
    </form>
  )
}

export default AddSolution
