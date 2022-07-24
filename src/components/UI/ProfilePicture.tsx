import { Image, Tooltip } from '@/components'

import { useAvatar } from '@/hooks'
import { twclsx } from '@/utils'

import { User } from 'expense-app'
import { useEffect } from 'react'
import { HiCamera } from 'react-icons/hi'

type ProfilePictureProps = {
  user: User
}

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = ({ user }) => {
  const { avatar, uploadAvatar, refreshAvatar } = useAvatar(user as User)

  useEffect(() => {
    refreshAvatar()
  }, [])

  return (
    <div
      className={twclsx('relative inline-flex', 'mb-4 mt-8 md:mt-12 rounded-full overflow-hidden')}
    >
      <Image
        src={avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
        alt={user?.username as string}
        className={twclsx('w-16 md:w-24 h-16 md:h-24', 'object-cover')}
      />

      <Tooltip title='Update profile picture' position='right-end' arrowSize='regular' arrow>
        <label
          htmlFor='upload-image'
          className={twclsx(
            'absolute bottom-0 inset-x-0 py-2',
            'flex items-center justify-center',
            'opacity-0 hover:opacity-100 cursor-pointer',
            'bg-theme-8/80 text-theme-1'
          )}
        >
          <HiCamera />
        </label>
      </Tooltip>

      <input
        onChange={uploadAvatar}
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
