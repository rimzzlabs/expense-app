import {
  EditExpense,
  Expense,
  ExpenseDetail,
  ExpenseHistory,
  Prompt,
  Theme,
  User
} from 'expense-app'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<Theme>('APP_THEME', 'light')

export const userAtom = atom<User | null>(null)

export const expenseDetailAtom = atom<ExpenseDetail | null>(null)
export const expenseListsAtom = atom<Expense[]>([])

export const historyListsAtom = atom<ExpenseHistory[]>([])

const initialValue: Prompt = {
  onClose: () => null,
  onConfirm: () => null,

  title: '',
  message: '',
  isOpen: false
}

export const promptAtom = atom<Prompt>(initialValue)

export const createExpenseModalIsOpen = atom(false)
export const createdHistoryModal = atom(false)
export const editExpenseAtom = atom<EditExpense>({
  isOpen: false,
  id: null,
  title: null
})
