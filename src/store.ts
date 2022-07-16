import { Theme } from 'expense-app'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<Theme>('APP_THEME', 'light')
