import { Bin, FormEvent, Send, Undo } from '@components'

type SubmitProps = {
  cancel: () => void
  handleSubmit: (e: FormEvent) => void
}

const SubmitReset = ({ cancel, handleSubmit }: SubmitProps) => {
  return (
    <div className="flex justify-around pt-2">
      <div className="group submitGroup" onClick={cancel}>
        <Undo onClick={cancel} title="Reset" className="submitSub" />
        <span className="submitSub">Reset</span>
      </div>
      <div className="group submitGroup" onClick={handleSubmit} title="Add Customer">
        <Send onClick={handleSubmit} className="submitSub" />
        <span className="submitSub">Add</span>
      </div>
    </div>
  )
}

export default SubmitReset
