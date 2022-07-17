import { ImSpinner2 } from 'react-icons/im'

const Loading: React.FunctionComponent = () => {
  return (
    <div className='flex items-center justify-center w-full py-10 md:py-20'>
      <ImSpinner2 className='w-10 h-10 md:w-16 md:h-16 animate-spin text-primary-5' />
    </div>
  )
}

export default Loading
