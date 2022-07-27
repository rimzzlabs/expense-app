import { AuthLayer, Button, ErrorButton, Input, ProfilePicture, Tooltip } from '@/components'

import {
  useAvatar,
  useEditEmail,
  useEditUsername,
  usePrompt,
  useStepsUpdateEmail,
  useUser
} from '@/hooks'
import { signOut } from '@/services'
import { twclsx } from '@/utils'

import { User } from 'expense-app'
import { useEffect } from 'react'
import { HiQuestionMarkCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FunctionComponent = () => {
  const user = useUser()
  const navigate = useNavigate()
  const { clearAvatar } = useAvatar(user as User)
  const { openPrompt, closePrompt } = usePrompt()
  const { openModal: openModalEditUsername } = useEditUsername()
  const { openModal: openModalEditEmail } = useEditEmail()
  const { openModal: openModalSteps } = useStepsUpdateEmail()

  const handleSignout = async () => {
    await signOut()
    clearAvatar()
    closePrompt()
    navigate('/signin', { replace: true })
  }

  useEffect(() => {
    if (!user) {
      navigate('/signin', { replace: true })
    }
  }, [user])

  return (
    <AuthLayer>
      <div className='pt-10'>
        <h1 className='mb-4'>Your Profile</h1>

        {user && <ProfilePicture user={user} />}

        <div className='flex flex-col gap-6 mb-6 max-w-md'>
          <div className='inline-flex flex-col gap-2 w-full'>
            <label htmlFor='username'>Username</label>

            <Input
              id='username'
              value={user?.username ?? user?.name?.replaceAll(' ', '')}
              readOnly
              disabled
            />

            <Button
              onClick={openModalEditUsername}
              className='border-none justify-start max-w-max text-primary-4'
            >
              Update username
            </Button>
          </div>

          <div className='inline-flex flex-col gap-2 w-full'>
            <label htmlFor='email'>Email address</label>

            <Input id='email' value={user?.email} readOnly disabled />

            <div className='inline-flex items-center gap-2.5'>
              <Button
                onClick={openModalEditEmail}
                className='border-none justify-start max-w-max text-primary-4'
              >
                Change email address
              </Button>

              <Tooltip
                title='Click to see how to change my email address'
                position='bottom-start'
                arrowSize='small'
                arrow
              >
                <Button onClick={openModalSteps} className='border-none max-w-max'>
                  <HiQuestionMarkCircle className='text-xl' />
                  <span className='sr-only'>How to change my email address?</span>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <ErrorButton
          onClick={() =>
            openPrompt({
              message: 'Are you sure you want to signout from ExpenseApp?',
              title: 'Signout warning',
              onConfirm: handleSignout
            })
          }
          className={twclsx('py-2.5 px-5')}
        >
          Signout
        </ErrorButton>
      </div>
    </AuthLayer>
  )
}

export default ProfilePage
