import { createExpenseHistory, getExpenseHistory } from '@/services'
import * as atoms from '@/store'

import { CreateHistoryPayload, Expense, ExpenseHistory } from 'expense-app'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'

export type TypedLocation = {
  state: Expense | null
} & Location

const useExpenseDetail = () => {
  const [expenseDetail, setExpenseDetail] = useAtom(atoms.expenseDetailAtom)
  const [historyLists, setHistoryLists] = useAtom(atoms.historyListsAtom)
  const [stale, setStale] = useState({
    isError: false,
    isLoading: false
  })

  const { state } = useLocation() as TypedLocation
  const navigate = useNavigate()

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
      if (!expenseDetail) return

      const res = await createExpenseHistory(payload, expenseDetail.history_id)
      if (!res) return

      await refreshHistoryLists()
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

  return {
    isError: stale.isError,
    isLoading: stale.isLoading,
    historyLists: historyLists.sort(sort),
    refreshHistoryLists,
    expenseDetail,
    addExpenseHistory,
    syncFirstMounted
  }
}

export default useExpenseDetail
