import { AuthLayer } from '@/components'

import { useUser } from '@/hooks'

import { useId } from 'react'
import { Navigate } from 'react-router-dom'

const HomePage: React.FunctionComponent = () => {
  const todolists = [
    'Create new expense',
    'Create new income',
    'Create new outcome',
    'Calculate expense'
  ]

  const { user } = useUser()
  if (!user) {
    return <Navigate to='/signin' replace />
  }

  return (
    <AuthLayer>
      <section>
        <h1>Welcome back, {user.username}!</h1>
        <p className='mt-4 mb-2'>Here&apos;s what you might want to do here</p>
        <ul className='list-disc list-inside'>
          {todolists.map((todo) => {
            const id = useId()
            return (
              <li className='[&::marker]:text-primary-5' key={id}>
                {todo}
              </li>
            )
          })}
        </ul>
      </section>
    </AuthLayer>
  )
}

export default HomePage
