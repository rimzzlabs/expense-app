import { AuthLayer } from '@/components'

const ExpensePage: React.FunctionComponent = () => {
  return (
    <AuthLayer>
      <section className='pt-10'>
        <h1>My Expenses💰</h1>
        <p>List of your expense, you can create, modify or delete your expense here.</p>
      </section>
    </AuthLayer>
  )
}

export default ExpensePage
