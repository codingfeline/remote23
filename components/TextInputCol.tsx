type TextInputProps = {
  value: string
  name: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  label?: string
}

const TextInput = ({
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  label = '',
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
          placeholder={`${name} ${label}`}
        />
      </div>
    </>
  )
}

export default TextInput
