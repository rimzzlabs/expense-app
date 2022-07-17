import { AuthLayer, ErrorButton, Input } from '@/components'

import { usePrompt, useUser } from '@/hooks'
import { signOut } from '@/services'
import { twclsx } from '@/utils'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FunctionComponent = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { openPrompt, closePrompt } = usePrompt()

  const handleSignout = async () => {
    await signOut()
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

        <form className='flex flex-col gap-4 mb-4'>
          <div className='inline-flex flex-col gap-2 w-full'>
            <label htmlFor='username'>Username</label>

            <Input id='username' className='max-w-md' value={user?.username} readOnly disabled />
          </div>
          <div className='inline-flex flex-col gap-2 w-full'>
            <label htmlFor='email'>Email address</label>

            <Input id='email' className='max-w-md' value={user?.email} readOnly disabled />
          </div>
        </form>

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
