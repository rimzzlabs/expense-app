import { Expense, ExpenseDetail, ExpenseHistory, HashQuery, User } from 'expense-app'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)

export const expenseDetailAtom = atom<ExpenseDetail | null>(null)
export const expenseListsAtom = atom<Expense[]>([])

export const historyListsAtom = atom<ExpenseHistory[]>([])

export const hashQuery = atom<HashQuery>({})
