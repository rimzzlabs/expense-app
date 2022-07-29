import { EditExpense, EditHistory, Prompt, Theme } from 'expense-app'
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
export const editUsernameModal = atom(false)
export const editEmailModal = atom(false)
export const editPasswordModal = atom(false)
export const stepsUpdateEmail = atom(false)
export const avatarAtom = atom<string | null>(null)
export const editExpenseAtom = atom<EditExpense>({
  isOpen: false,
  id: null,
  title: null
})
export const editHistoryAtom = atom<EditHistory>({
  isOpen: false,
  id: null,
  source: null
})
