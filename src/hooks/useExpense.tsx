import { getExpense } from '@/services'
import * as atoms from '@/store'

import useUser from './useUser'

import { Expense } from 'expense-app'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

const useExpense = () => {
  const user = useUser()
  const [expenseLists, setExpenseLists] = useAtom(atoms.expenseListsAtom)
  const [filteredExpenseLists, setFilteredExpenseLists] = useAtom(atoms.filteredExpenseListsAtom)
  const [searchQuery, setSearchQuery] = useAtom(atoms.queryExpenseListsAtom)

  const clearValue = useCallback(() => setSearchQuery(''), [])
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    []
  )

  const getNewestExpense = (expense: Expense[]) =>
    expense
      .slice(0)
      .sort((a: Expense, b: Expense) =>
        new Date(a.created_at) < new Date(b.created_at)
          ? 1
          : new Date(a.created_at) > new Date(b.created_at)
          ? -1
          : 0
      )

  const refreshExpense = async () => {
    if (user) {
      const response = await getExpense(user?.id as string)
      if (response) {
        setExpenseLists(response)
      }
      return
    }
    toast.error('Could not refresh expense')
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      const timer = setTimeout(() => {
        const filterResult =
          expenseLists.filter((exp) =>
            exp.title.toLowerCase().includes(searchQuery.toLowerCase())
          ) || []

        setFilteredExpenseLists(filterResult)
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [searchQuery])

  return {
    searchQuery,
    handleSearch,
    refreshExpense,
    clearValue,
    filteredExpenseLists: getNewestExpense(filteredExpenseLists),
    expenseLists: getNewestExpense(expenseLists)
  }
}

export default useExpense
