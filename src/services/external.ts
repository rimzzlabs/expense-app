// External service
// use this file to delete user, please note you need to use your service_role to delete user
// so in my case, i create a simple expressjs app and deployed to heroku
import { CustomError } from '@/utils'

import { supabase } from './supabase'

import { Expense, ExpenseHistory } from 'expense-app'
import toast from 'react-hot-toast'

export const deleteUser = async (user_id: string) => {
  const toastId = toast.loading('Loading...')

  try {
    await supabase.storage.from('profiles').remove(['avatar/' + user_id])
    await supabase
      .from<ExpenseHistory>('history')
      .delete({ returning: 'minimal' })
      .eq('user_id', user_id)
    await supabase.from<Expense>('expense').delete({ returning: 'minimal' }).eq('user_id', user_id)
    await supabase.auth.signOut()

    const response = await fetch(`https://exppbe.herokuapp.com/user?uid=${user_id}`, {
      method: 'DELETE'
    })

    if (!response.ok)
      throw new CustomError({
        details: '',
        hint: '',
        name: 'Error deleting user',
        message: response.statusText,
        status: response.status
      })
    toast.success('Account deleted!')
  } catch (e) {
    e instanceof Error && toast.error(e.message)
  } finally {
    toast.remove(toastId)
  }
}
