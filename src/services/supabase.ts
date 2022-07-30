import { CustomError } from '@/utils'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

import { createClient } from '@supabase/supabase-js'
import {
  CreateExpensePayload,
  CreateHistoryPayload,
  Expense,
  ExpenseHistory,
  SigninUserPayload,
  SignupUserPayload,
  UpdateUserMetaDataPayload,
  UpdateUserPayload
} from 'expense-app'
import toast from 'react-hot-toast'
import { v4 as uid } from 'uuid'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const signIn = async (payload: SigninUserPayload) => {
  const id = toast.loading('Loading..')
  try {
    const response = await supabase.auth.signIn({ ...payload })

    if (response.error) throw new CustomError(response.error)

    toast.success('Signed in!')
    return response.user
  } catch (e) {
    e instanceof CustomError && toast.error(e.message)

    return null
  } finally {
    toast.remove(id)
  }
}

export const SignInWithGoogle = async () => await supabase.auth.signIn({ provider: 'google' })

export const SignInWithGitHub = async () => await supabase.auth.signIn({ provider: 'github' })

export const signUp = async (payload: SignupUserPayload) => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase.auth.signUp(
      { email: payload.email, password: payload.password },
      { data: { username: payload.username } }
    )

    if (response.error) throw new CustomError(response.error)

    toast.success('Check your email to verify your account 😎')
    return true
  } catch (e) {
    e instanceof Error && toast.error(e.message)
    return false
  } finally {
    toast.remove(toastId)
  }
}

export const signOut = async () => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase.auth.signOut()

    if (response.error) throw new CustomError(response.error)

    toast.success('Signed out!')
    return true
  } catch (e) {
    e instanceof Error && toast.error(e.message)
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

    if (response.error) throw new CustomError(response.error)

    toast.success('New expense created')
    return response.data
  } catch (e) {
    e instanceof Error && toast.error(e.message)
    return null
  } finally {
    toast.remove(toastId)
  }
}

export const getExpense = async (userId: string) => {
  if (userId) {
    try {
      const response = await supabase.from<Expense>('expense').select('*').eq('user_id', userId)

      if (response.error) throw new CustomError(response.error)

      return response.data
    } catch (e) {
      e instanceof Error && toast.error(e.message)

      return null
    }
  }
}

export const getExpenseByHistoryId = async (historyId: string, userId: string) => {
  if (userId) {
    try {
      const response = await supabase
        .from<Expense>('expense')
        .select('*')
        .eq('history_id', historyId)
        .eq('user_id', userId)

      if (response.error) throw new CustomError(response.error)

      return response.data[0]
    } catch (e) {
      e instanceof Error && toast.error(e.message)

      return null
    }
  }
  return null
}

export const updateExpense = async (
  payload: Partial<Expense>,
  userId: string,
  showToast = true
) => {
  if (userId) {
    const toastId = toast.loading('Updating...')

    try {
      const response = await supabase
        .from<Expense>('expense')
        .update(payload, { returning: 'minimal' })
        .eq('id', payload.id as string)

      if (response.error) throw new CustomError(response.error)
      showToast && toast.success('Expense updated!')

      return true
    } catch (e) {
      e instanceof Error && toast.error(e.message)

      return null
    } finally {
      toast.remove(toastId)
    }
  } else {
    toast.error('Unauthorized!')
    return null
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
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toast.remove(toastId)
  }
}

export const getExpenseHistory = async (historyId: string, showToast = false) => {
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .select('*')
      .eq('expense_id', historyId)

    if (response.error) throw new CustomError(response.error)

    return response.data
  } catch (e) {
    e instanceof Error && showToast && toast.error(e.message)

    return null
  }
}

export const createExpenseHistory = async (
  payload: CreateHistoryPayload & { user_id: string },
  historyId: string
) => {
  const toastId = toast.loading('Adding history...')
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .insert({ ...payload, expense_id: historyId }, { returning: 'minimal' })

    if (response.error) throw new CustomError(response.error)

    toast.success('History added!')
    return true
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toast.remove(toastId)
  }
}

export const deleteHistory = async (expenseId: string, showToast = true) => {
  const toastId = showToast && toast.loading('Loading...')
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .delete({ returning: 'minimal' })
      .eq('expense_id', expenseId)

    if (response.error) throw new CustomError(response.error)
    showToast && toast.success('Deleted successfully')

    return response.data
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toastId && toast.remove(toastId)
  }
}

export const deleteSingleHistory = async (historyId: string, showToast = true) => {
  const toastId = showToast && toast.loading('Loading...')
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .delete({ returning: 'minimal' })
      .eq('id', historyId)

    if (response.error) throw new CustomError(response.error)
    showToast && toast.success('Deleted successfully')

    return response.data
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toastId && toast.remove(toastId)
  }
}

export const updateExpenseHistory = async (payload: Partial<ExpenseHistory>, historyId: string) => {
  const toastId = toast.loading('Loading...')
  try {
    const response = await supabase
      .from<ExpenseHistory>('history')
      .update(payload, { returning: 'minimal' })
      .eq('id', historyId)

    if (response.error) throw new CustomError(response.error)
    toast.success('Updated successfully')

    return response.data
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toast.remove(toastId)
  }
}

export const uploadUserAvatar = async (payload: Blob, filename: string) => {
  const toastId = toast.loading('Uploading profile picture')
  try {
    await supabase.storage.from('profiles').remove(['avatar/' + filename])
    const response = await supabase.storage
      .from('profiles/avatar')
      .upload(filename, payload, { cacheControl: '3600', upsert: true })

    if (response.error) throw new CustomError(response.error)
    toast.success('Upload complete!')

    return true
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toast.remove(toastId)
  }
}

/**
 * use this function only update user `username` or `email`
 * @returns
 */
export const updateUserProfile = async (
  payload: Partial<UpdateUserPayload>,
  metaData?: UpdateUserMetaDataPayload
) => {
  const toastId = toast.loading('Updating your profile')
  try {
    const response = await supabase.auth.update(
      metaData ? { ...payload, data: metaData } : { ...payload }
    )

    if (response.error) throw new CustomError(response.error)
    toast.success('Updated successfully!')
    if ('email' in payload && !metaData) {
      toast.success('Please check your new email to verify your changes!')
    }

    return true
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toast.remove(toastId)
  }
}

export const updateUserPassword = async (password: string) => {
  const toastId = toast.loading('Updating your password')
  try {
    const response = await supabase.auth.update({ password })

    if (response.error) throw new CustomError(response.error)
    toast.success('Updated successfully!')

    return true
  } catch (e) {
    e instanceof Error && toast.error(e.message)

    return null
  } finally {
    toast.remove(toastId)
  }
}

export const resetPassword = async (email: string) => {
  const toastId = toast.loading('Sending you an email confirmation..')
  try {
    const response = await supabase.auth.api.resetPasswordForEmail(email)

    if (response.error) throw new CustomError(response.error)
    toast.success('Check your email to login and proceed updating your password!')
  } catch (e) {
    e instanceof Error && toast.error(e.message)
  } finally {
    toast.remove(toastId)
  }
}
