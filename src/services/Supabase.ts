import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

import { createClient } from '@supabase/supabase-js'
import { CreateExpensePayload, Expense, SigninUserPayload, SignupUserPayload } from 'expense-app'
import toast from 'react-hot-toast'
import { v4 as uid } from 'uuid'

export default {
  Supabase: createClient(SUPABASE_URL, SUPABASE_ANON_KEY),
  getSession() {
    return this.Supabase.auth.session()
  },

  async signIn(payload: SigninUserPayload) {
    const id = toast.loading('Loading..')
    try {
      const response = await this.Supabase.auth.signIn({ ...payload })
      if (response.error) {
        toast.error(response.error.message ?? 'Could not signin')
      }
      toast.success('Signed in!')
      return response.user
    } catch (e) {
      toast.error('Could not signin, please try again')
      return null
    } finally {
      toast.remove(id)
    }
  },

  async signUp(payload: SignupUserPayload) {
    const toastId = toast.loading('Loading...')
    try {
      const response = await this.Supabase.auth.signUp(
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
  },

  async signOut() {
    const toastId = toast.loading('Loading...')
    try {
      const response = await this.Supabase.auth.signOut()
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
  },

  async createExpense(payload: CreateExpensePayload) {
    const toastId = toast.loading('Loading...')
    try {
      const response = await this.Supabase.from<Expense>('expense').insert({
        ...payload,
        expense_id: this.getSession()?.user?.id,
        history_id: uid(),
        created_at: new Date().toISOString()
      })
      if (response.status > 400) {
        toast.error(response.statusText)
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
  },

  async getExpense() {
    const id = this.getSession()?.user?.id
    if (id) {
      try {
        const response = await this.Supabase.from<Expense>('expense')
          .select('*')
          .eq('expense_id', id)
        if (response.status > 400) {
          toast.error(response.statusText)
          return null
        }
        return response.data
      } catch (e) {
        toast.error('Could not create expense, please try again later')
        return null
      }
    } else {
      toast.error('Unauthorized!')
    }
  },

  async updateExpense(payload: Partial<Expense>) {
    const id = this.getSession()?.user?.id
    if (id) {
      const toastId = toast.loading('Updating...')
      try {
        const response = await this.Supabase.from<Expense>('expense').upsert({ ...payload })
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
  },

  async deleteExpense(id: string) {
    const toastId = toast.loading('Loading...')
    try {
      const response = await this.Supabase.from<Expense>('expense').delete().eq('id', id)
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
}
