import { Image } from '@/components'

import { useAvatar } from '@/hooks'
import { twclsx } from '@/utils'

import { User } from 'expense-app'
import { HiCamera } from 'react-icons/hi'

type ProfilePictureProps = {
  user: User
}

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = ({ user }) => {
  const avatar = useAvatar(user as User)

  return (
    <div className={twclsx('relative inline-flex', 'mb-4 mt-8 md:mt-12')}>
      <Image
        src={avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
        alt={user?.username as string}
        className={twclsx('w-12 md:w-16 h-12 md:h-16', 'rounded-full object-cover')}
      />

      <label
        htmlFor='upload-image'
        className={twclsx(
          'absolute bottom-0 inset-x-0 py-2',
          'flex items-center justify-center',
          'opacity-0 hover:opacity-100 cursor-pointer',
          'bg-theme-8/80'
        )}
      >
        <HiCamera />
      </label>

      <input
        type='file'
        id='upload-image'
        name='upload-image'
        accept='image/png, image/jpeg, image/jpg'
        hidden
      />
    </div>
  )
}

export default ProfilePicture
