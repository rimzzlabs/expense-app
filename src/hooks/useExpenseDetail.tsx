import { createExpenseHistory, getExpenseHistory, supabase } from '@/services'
import * as atoms from '@/store'

import { CreateHistoryPayload, Expense, ExpenseHistory } from 'expense-app'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'

export type TypedLocation = {
  state: Expense | null
} & Location

const useExpenseDetail = () => {
  const [expenseDetail, setExpenseDetail] = useAtom(atoms.expenseDetailAtom)
  const [historyLists, setHistoryLists] = useAtom(atoms.historyListsAtom)
  const [filteredHistoryLists, setFilteredHistoryLists] = useAtom(atoms.filteredHistoryListsAtom)
  const [searchQuery, setSearchQuery] = useAtom(atoms.queryHistoryListsAtom)
  const [stale, setStale] = useState({
    isError: false,
    isLoading: false
  })

  const { state } = useLocation() as TypedLocation
  const navigate = useNavigate()

  const clearValue = useCallback(() => setSearchQuery(''), [])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    []
  )

  const sort = (a: ExpenseHistory, b: ExpenseHistory) =>
    new Date(a.created_at) < new Date(b.created_at)
      ? 1
      : new Date(a.created_at) > new Date(b.created_at)
      ? -1
      : 0

  const refreshExpenseDetail = useCallback(
    (args: ExpenseHistory[]) => {
      const totalIncome = args
        ?.filter((e) => e.type === 'income')
        .reduce((acc, cur) => acc + cur.amount, 0)
      const totalOutcome = args
        ?.filter((e) => e.type === 'outcome')
        .reduce((acc, cur) => acc + cur.amount, 0)

      if (state) {
        setExpenseDetail({
          ...state,
          totalIncome,
          totalOutcome,
          currentMoney: state.total_money + totalIncome - totalOutcome
        })
      }
    },
    [historyLists]
  )

  const refreshHistoryLists = useCallback(async () => {
    if (!expenseDetail) return

    const res = await getExpenseHistory(expenseDetail.history_id)
    if (!res) return

    refreshExpenseDetail(res)
    setHistoryLists(res)
  }, [expenseDetail])

  const addExpenseHistory = useCallback(
    async (payload: CreateHistoryPayload) => {
      const user = supabase.auth.user()
      if (!expenseDetail) return

      if (user) {
        const res = await createExpenseHistory(
          { ...payload, user_id: user.id },
          expenseDetail.history_id
        )
        if (!res) return

        await refreshHistoryLists()
      }
    },
    [expenseDetail]
  )

  const syncFirstMounted = useCallback(async () => {
    setStale((prev) => ({ ...prev, isLoading: true }))

    if (!state) {
      navigate('/', { replace: true })
      return
    }

    const res = await getExpenseHistory(state.history_id)

    if (res === null) {
      setStale({ isError: true, isLoading: false })
      setExpenseDetail({ ...state, currentMoney: 0, totalIncome: 0, totalOutcome: 0 })
      return
    }

    refreshExpenseDetail(res)
    setHistoryLists(res)

    setStale({ isError: false, isLoading: false })
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const timer = setTimeout(() => {
        const filterResult = historyLists.filter((h) =>
          h.source.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setFilteredHistoryLists(filterResult)
      }, 100)
      return () => clearInterval(timer)
    }
  }, [searchQuery])

  return {
    isError: stale.isError,
    isLoading: stale.isLoading,
    historyLists: historyLists.slice().sort(sort),
    filteredHistoryLists: filteredHistoryLists.slice().sort(sort),
    handleSearch,
    clearValue,
    searchQuery,
    refreshHistoryLists,
    expenseDetail,
    addExpenseHistory,
    syncFirstMounted
  }
}

export default useExpenseDetail
