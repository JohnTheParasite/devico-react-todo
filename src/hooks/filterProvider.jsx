import React, { useContext, useCallback, useState } from 'react'

const FilterContext = React.createContext()
const FilterUpdateContext = React.createContext()

export function useFilter() {
  return useContext(FilterContext)
}

export function useFilterUpdate() {
  return useContext(FilterUpdateContext)
}

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('All')

  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  return (
    <FilterContext.Provider value={filter}>
      <FilterUpdateContext.Provider value={changeFilter}>{children}</FilterUpdateContext.Provider>
    </FilterContext.Provider>
  )
}

export default {
  FilterProvider,
  useFilter,
  useFilterUpdate,
}