type TextInputProps = {
  value: string
  name: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const TextInput = ({
  name,
  type = 'text',
  value,
  onChange,
  required = false,
}: TextInputProps) => {
  return (
    <>
      <div className="flex flex-col">
        {/* <label className="w-full text-center" htmlFor={name}>
          {name}
        </label> */}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder="name"
        />
      </div>
    </>
  )
}

export default TextInput
