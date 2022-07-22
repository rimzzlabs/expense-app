declare module 'expense-app' {
  export type Theme = 'light' | 'dark'

  export type Prompt = {
    isOpen: boolean
    title: string
    message: string
    children?: React.ReactNode
    onClose: () => void
    onConfirm: () => void
  }

  export type User = {
    id: string
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

  export type ExpenseDetail = {
    totalIncome: number
    totalOutcome: number
    currentMoney: number
  } & Expense

  export type ExpenseHistory = {
    id: string
    expense_id: string
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

  export type CreateHistoryPayload = {
    source: string
    amount: number
    type: ExpenseHistory['type']
  }

  export type EditExpense = {
    isOpen: boolean
    id: string | null
    title: string | null
  }

  export type SelectOptionProps<T = Record<string, string>[]> = {
    list: T
  }
}
