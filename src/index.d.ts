declare module 'expense-app' {
  export type Theme = 'light' | 'dark'

  export type Prompt = {
    isOpen: boolean
    title: string
    message: string
    onClose: () => void
    onConfirm: () => void
  }

  export type User = {
    username: string
    email: string
  }

  export type Expense = {
    id: string
    history_id: string
    user_id: string
    created_at: string | Date
    title: string
    total_money: number
  }

  export type ExpenseHistory = {
    id: string
    created_at: string | Date
    source: string
    type: 'income' | 'outcome'
    amount: number
  }

  export type SignupUserPayload = {
    username: string
    email: string
    password: string
  }

  export type SigninUserPayload = {
    email: string
    password: string
  }

  export type CreateExpensePayload = {
    title: string
    total_money: number
  }
}
