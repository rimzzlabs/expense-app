import { twclsx } from '@/utils'

import Input from './Input'
import InputError from './InputError'

type InputGroupProps = {
  htmlForAndName: string
  label: string
  placeholder: string
  afterInput?: React.ReactNode
  errorMsg?: string
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  label,
  placeholder,
  htmlForAndName,
  afterInput,
  errorMsg,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label htmlFor={htmlForAndName}>{label}</label>
        {errorMsg && <InputError msg={errorMsg} />}
      </div>
      <Input
        id={htmlForAndName}
        name={htmlForAndName}
        placeholder={placeholder}
        className={twclsx(errorMsg && 'border-error-1 focus:border-error-1 focus:ring-error-1')}
        {...props}
      />
      {afterInput}
    </div>
  )
}

export default InputGroup
