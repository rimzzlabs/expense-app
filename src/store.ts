import { Expense, ExpenseHistory, Theme, User } from 'expense-app'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<Theme>('APP_THEME', 'light')

export const userAtom = atom<User | null>(null)

export const expenseListsAtom = atom<Expense[]>([])

export const historyListsAtom = atom<ExpenseHistory[]>([])
