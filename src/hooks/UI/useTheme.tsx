import { themeAtom } from '@/store'

import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  const toggleTheme = useCallback(
    () => setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light')),
    []
  )

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
