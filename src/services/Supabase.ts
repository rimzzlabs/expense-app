import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

import { createClient } from '@supabase/supabase-js'
import { CreateExpensePayload, Expense, SigninUserPayload, SignupUserPayload } from 'expense-app'
import toast from 'react-hot-toast'
import { v4 as uid } from 'uuid'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const signIn = async (payload: SigninUserPayload) => {
  const id = toast.loading('Loading..')
  try {
    const response = await supabase.auth.signIn({ ...payload })
    if (response.error) {
      toast.error(response.error.message ?? 'Could not signin')
      return null
    }
    toast.success('Signed in!')
    return response.user
  } catch (e) {
    toast.error('Could not signin, please try again')
    return null
  } finally {
    toast.remove(id)
  }
}

export const signUp = async (payload: SignupUserPayload) => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase.auth.signUp(
      { email: payload.email, password: payload.password },
      { data: { username: payload.username } }
    )
    if (response.error) {
      toast.error(response.error.message)
      return false
    }
    toast.success('Check your email to verify your account 😎')
    return true
  } catch (e) {
    toast.error('Could not signing you up, please try again')
    return false
  } finally {
    toast.remove(toastId)
  }
}

export const signOut = async () => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase.auth.signOut()
    if (response.error) {
      toast.error(response.error.message)
      return false
    }
    toast.success('Signed out!')
    return true
  } catch (e) {
    toast.error('Could not signing you out, please try again')
    return false
  } finally {
    toast.remove(toastId)
  }
}

export const createExpense = async (payload: CreateExpensePayload, userId: string) => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase.from<Expense>('expense').insert({
      ...payload,
      user_id: userId,
      history_id: uid()
    })
    if (response.error) {
      toast.error('Error creating expense')
      return null
    }
    toast.success('New expense created')
    return response.data
  } catch (e) {
    toast.error('Could not create expense, please try again later')
    return null
  } finally {
    toast.remove(toastId)
  }
}

export const getExpense = async (sessionId: string) => {
  if (sessionId) {
    try {
      const response = await supabase.from<Expense>('expense').select('*').eq('user_id', sessionId)
      if (response.status > 400) {
        toast.error(response.statusText)
        return null
      }
      return response.data
    } catch (e) {
      toast.error('Could not create expense, please try again later')
      return null
    }
  }
}

export const updateExpense = async (payload: Expense, userId: string) => {
  const id = userId
  if (id) {
    const toastId = toast.loading('Updating...')
    try {
      const response = await supabase.from<Expense>('expense').update({ ...payload })
      if (response.status > 400) {
        toast.error(response.statusText)
        return null
      }
      toast.success('Expense updated!')
      return response.data
    } catch (e) {
      toast.error('Could not update expense, please try again later')
      return null
    } finally {
      toast.remove(toastId)
    }
  } else {
    toast.error('Unauthorized!')
  }
}

export const deleteExpense = async (expenseId: string) => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase.from<Expense>('expense').delete().eq('id', expenseId)
    if (response.status > 400) {
      toast.error(response.statusText)
      return null
    }
    toast.success('Deleted successfully')
    return response.data
  } catch (e) {
    toast.error('Could not delete expense, please try again later')
    return null
  } finally {
    toast.remove(toastId)
  }
}
