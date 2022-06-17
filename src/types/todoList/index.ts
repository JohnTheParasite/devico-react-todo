export type ListState = { id: string; content: string; done: boolean; createdAt: string; updatedAt: string }

export type Lengths = {
  todoLength: number
  todoDoneLength: number
  todoActiveLength: number
}

export type TodoDataType = {
  filter: string
  changeFilter: (newFilter: string) => void
  list: ListState[]
  setList: (newList: ListState[]) => void
  getLength: () => Lengths
  getFilteredList: () => ListState[]
}
