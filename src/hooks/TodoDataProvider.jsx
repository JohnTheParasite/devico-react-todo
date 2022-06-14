import React, { useContext, useCallback, useState, useMemo } from 'react'
import { FILTER_ALL } from '@/constants'

const TodoDataContext = React.createContext()

export function useTodoData() {
  return useContext(TodoDataContext)
}

export function TodoDataProvider({ children }) {
  const [filter, setFilter] = useState(FILTER_ALL)

  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  const todoData = useMemo(() => {
    return {
      filter,
      changeFilter,
    }
  }, [filter])

  return <TodoDataContext.Provider value={todoData}>{children}</TodoDataContext.Provider>
}
