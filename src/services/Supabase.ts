import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

import { createClient } from '@supabase/supabase-js'
import {
  CreateExpensePayload,
  CreateHistoryPayload,
  Expense,
  ExpenseDetail,
  ExpenseHistory,
  SigninUserPayload,
  SignupUserPayload
} from 'expense-app'
import toast from 'react-hot-toast'
import { v4 as uid } from 'uuid'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const signIn = async (payload: SigninUserPayload) => {
  const id = toast.loading('Loading..')
  try {
    const response = await supabase.auth.signIn({ ...payload })

    if (response.error) {
      throw response
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
      throw response
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
      throw response
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
    const response = await supabase
      .from<Expense>('expense')
      .insert({ ...payload, user_id: userId, history_id: uid() }, { returning: 'minimal' })

    if (response.error) {
      throw response
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

export const getExpense = async (userId: string) => {
  if (userId) {
    try {
      const response = await supabase.from<Expense>('expense').select('*').eq('user_id', userId)

      if (response.status > 400) {
        throw response
      }

      return response.data
    } catch (e) {
      toast.error('Could not get expense, please try again later')
      return null
    }
  }
}

export const getExpenseById = async (expenseId: string, userId: string) => {
  if (userId) {
    try {
      const response = await supabase
        .from<Expense>('expense')
        .select('*')
        .eq('user_id', userId)
        .eq('history_id', expenseId)

      if (response.status > 400 || !response.data) {
        throw response
      }

      return response.data[0]
    } catch (e) {
      toast.error('Could not get expense, please try again later')
      return null
    }
  }
}

export const updateExpense = async (payload: ExpenseDetail, userId: string, showToast = true) => {
  if (userId) {
    const toastId = toast.loading('Updating...')
    const body: Expense = {
      id: payload.id,
      created_at: payload.created_at,
      history_id: payload.history_id,
      title: payload.title,
      total_money: payload.total_money,
      user_id: payload.user_id
    }

    try {
      const response = await supabase
        .from<Expense>('expense')
        .upsert(body, { returning: 'minimal' })
        .eq('id', body.id)

      if (response.status > 400) {
        throw response
      }

      showToast && toast.success('Expense updated!')
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

export const deleteExpense = async (expenseId: string, expense_history: string) => {
  const toastId = toast.loading('Loading...')
  try {
    await deleteHistory(expense_history, false)

    const response = await supabase.from<Expense>('expense').delete().eq('id', expenseId)
    if (response.error) throw response

    toast.success('Deleted successfully')
    return response
  } catch (e) {
    toast.error('Could not delete expense, please try again later')
    return null
  } finally {
    toast.remove(toastId)
  }
}

export const getExpenseHistory = async (historyId: string) => {
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .select('*')
      .eq('expense_id', historyId)

    if (response.status > 400) {
      throw response
    }

    return response.data
  } catch (e) {
    toast.error('Could not delete expense, please try again later')
    return null
  }
}

export const createExpenseHistory = async (payload: CreateHistoryPayload, id: string) => {
  const toastId = toast.loading('Adding history...')
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .insert({ ...payload, expense_id: id }, { returning: 'minimal' })

    if (response.status >= 400) {
      throw response
    }

    toast.success('History added!')
    return response.data
  } catch (e) {
    toast.error('Could not add expense history, please try again')
    return null
  } finally {
    toast.remove(toastId)
  }
}

export const deleteHistory = async (history_id: string, showToast = true) => {
  const toastId = showToast && toast.loading('Loading...')
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .delete({ returning: 'minimal' })
      .eq('expense_id', history_id)

    if (response.status > 400) {
      throw response
    }

    showToast && toast.success('Deleted successfully')
    return response.data
  } catch (e) {
    toast.error('Could not delete history, please try again later')
    return null
  } finally {
    toastId && toast.remove(toastId)
  }
}
