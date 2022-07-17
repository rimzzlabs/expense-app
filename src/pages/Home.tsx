import { AuthLayer } from '@/components'

import { useExpense, useUser } from '@/hooks'

import { Navigate } from 'react-router-dom'

const HomePage: React.FunctionComponent = () => {
  const { user } = useUser()
  const { expenseLists } = useExpense()

  if (!user) {
    return <Navigate to='/signin' replace />
  }

  return (
    <AuthLayer>
      <section className='pt-10'>
        <h1>Welcome back, {user.username}!</h1>
        <p className='mt-4 max-w-prose'>
          ExpenseApp can help you notes your income, outcome and manage your expense more easy.
        </p>
      </section>

      <section className='py-10'>
        <h2 className='mb-2.5'>💰My Expenses</h2>
        <p>List of your expenses</p>

        {expenseLists.length > 0 ? (
          <div>
            <p>H</p>
          </div>
        ) : (
          <p>You don&apos;t have any expense right not, add some?</p>
        )}
      </section>
    </AuthLayer>
  )
}

export default HomePage
