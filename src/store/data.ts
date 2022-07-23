import { Expense, ExpenseDetail, ExpenseHistory, User } from 'expense-app'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)

export const expenseDetailAtom = atom<ExpenseDetail | null>(null)
export const expenseListsAtom = atom<Expense[]>([])

export const historyListsAtom = atom<ExpenseHistory[]>([])
