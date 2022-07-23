import { EditExpense, Prompt, Theme } from 'expense-app'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const initialValue: Prompt = {
  onClose: () => null,
  onConfirm: () => null,

  title: '',
  message: '',
  isOpen: false
}

export const themeAtom = atomWithStorage<Theme>('APP_THEME', 'light')
export const promptAtom = atom<Prompt>(initialValue)
export const createExpenseModalIsOpen = atom(false)
export const createdHistoryModal = atom(false)
export const editExpenseAtom = atom<EditExpense>({
  isOpen: false,
  id: null,
  title: null
})