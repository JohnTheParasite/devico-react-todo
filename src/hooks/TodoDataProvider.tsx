import React, { useContext, useCallback, useState, useMemo, useEffect, ReactNode } from 'react'
import Api, { catchAxiosError } from '@/services/api'
import { FILTER_ACTIVE, FILTER_ALL } from '@/constants'
import { AxiosError } from 'axios'
import { TodoDataType, ListState } from '@/types/todoList'

const TodoDataContext = React.createContext({} as TodoDataType)

export function useTodoData() {
  return useContext(TodoDataContext)
}

export function TodoDataProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<string>(FILTER_ALL)
  const [list, setList] = useState<ListState[]>([])

  const changeFilter = useCallback((newFilter: string) => {
    setFilter(newFilter)
  }, [])

  const getLength = useCallback(() => {
    const todoLength = list.length
    const todoDoneLength = list.filter((el) => el.done).length
    const todoActiveLength = list.filter((el) => !el.done).length

    return {
      todoLength,
      todoDoneLength,
      todoActiveLength,
    }
  }, [list])

  const getFilteredList = useCallback(() => {
    let filteredList = list
    if (filter !== FILTER_ALL) {
      filteredList = filteredList.filter((el) => (filter === FILTER_ACTIVE ? !el.done : el.done))
    }
    return filteredList
  }, [filter, list])

  useEffect(() => {
    Api.getAllTodos()
      .then((res) => {
        if (res && res.data.length) {
          setList(res.data)
        } else {
          setList([])
        }
      })
      .catch((error: AxiosError) => {
        catchAxiosError(error)
      })
  }, [])

  const todoData = useMemo(() => {
    return {
      filter,
      changeFilter,
      list,
      setList,
      getLength,
      getFilteredList,
    }
  }, [filter, list])

  return <TodoDataContext.Provider value={todoData}>{children}</TodoDataContext.Provider>
}
