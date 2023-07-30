type TextAreaProps = {
  name: string
  value: string
  required?: boolean
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ name, value, onChange, required = false }: TextAreaProps) => {
  return (
    <>
      <div className="item">
        <label htmlFor={name}>{name}</label>
        <textarea name={name} value={value} onChange={onChange} required={required} />
      </div>
    </>
  )
}

export default TextArea
