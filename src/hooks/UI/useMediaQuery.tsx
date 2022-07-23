import { useCallback, useEffect, useState } from 'react'

/**
 *
 * @param query - a string of media query.
 * @param initialValue - initialvalue of isMatches, default is `false`
 * @example ```tsx
 * const isMedium = useMediaQuery('(min-width: 768px)')
 * ```
 * @returns
 */
const useMediaQuery = (query: string, initialValue = false) => {
  // check if the query is match with the given parameter
  const isMatch = (query: string) => {
    if (typeof window !== 'undefined') {
      // this will return true
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState(initialValue)

  // calllback for media query's event listener
  const handleChange = useCallback(() => setMatches(isMatch(query)), [query, setMatches])

  // we run side effect whenever media query has change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query)
      handleChange()
      mediaQuery.addEventListener('change', handleChange)

      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

export default useMediaQuery
