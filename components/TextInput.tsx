import { TextInputProps } from '@components'

const TextInput: React.FC<TextInputProps> = ({
  name,
  type = 'text',
  value,
  onChange,
  required = false,
}) => {
  return (
    <>
      <div className="item">
        <label htmlFor={name}>{name}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  )
}

export default TextInput
