import { Input } from '@/components'

import { HiOutlineSearch } from 'react-icons/hi'

type SearchbarProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
}

const Searchbar: React.FunctionComponent<SearchbarProps> = (props) => (
  <div className='my-4 md:my-8'>
    <div className='relative'>
      <Input
        disabled={props.disabled}
        type='text'
        className='peer w-full md:h-12 pr-8 border-none focus:ring-0'
        placeholder={props.placeholder ?? 'Search..'}
        value={props.value}
        onChange={props.onChange}
      />

      <HiOutlineSearch className='absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 opacity-30 peer-focus:opacity-100' />
    </div>
  </div>
)

export default Searchbar
