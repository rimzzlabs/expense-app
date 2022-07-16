import { Supabase } from '@/services'
import { expenseListsAtom } from '@/store'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useExpense = () => {
  const [expenseLists, setExpenseLists] = useAtom(expenseListsAtom)

  const refreshExpense = async () => {
    const response = await Supabase.getExpense()
    if (response) {
      setExpenseLists(response)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (expenseLists.length === 0) {
        const response = await Supabase.getExpense()
        if (response) {
          setExpenseLists(response)
        }
      }
    })()
  }, [expenseLists])

  return {
    expenseLists,
    refreshExpense
  }
}

export default useExpense
