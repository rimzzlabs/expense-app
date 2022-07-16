import Input from './Input'

type InputGroupProps = {
  htmlForAndName: string
  label: string
  placeholder: string
  afterInput?: React.ReactNode
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  label,
  placeholder,
  htmlForAndName,
  afterInput,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label htmlFor={htmlForAndName}>{label}</label>
      </div>
      <Input id={htmlForAndName} name={htmlForAndName} placeholder={placeholder} {...props} />
      {afterInput}
    </div>
  )
}

export default InputGroup
