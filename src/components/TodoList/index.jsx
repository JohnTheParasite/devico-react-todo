import React from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import styles from './styles.module.scss'

class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: 1,
      newInputLabel: '',
      filter: 'All',
      list: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const storageData = window.localStorage.getItem('todoItems')
    const result = storageData === null ? [] : JSON.parse(storageData)
    let itemId = 1
    if (result.length) {
      itemId = Math.max(...result.map((el) => el.id)) + 1
    }

    this.setState({ list: result, itemId })
  }

  handleChange = (value) => {
    this.setState({ newInputLabel: value })
  }

  toggleAllItems = () => {
    const { list } = this.state

    const listLength = list.length
    const doneListLength = list.filter((el) => el.done).length
    const done = doneListLength < listLength

    const changedList = list.map((el) => ({ ...el, done }))

    this.setState({ list: changedList })
    window.localStorage.setItem('todoItems', JSON.stringify(changedList))
  }

  addNewItem = (content) => {
    const { list, itemId } = this.state
    const changedList = list
    const item = {
      id: itemId,
      done: false,
      content,
    }
    changedList.push(item)

    this.setState({
      itemId: itemId + 1,
      newInputLabel: '',
      list: changedList,
    })
    window.localStorage.setItem('todoItems', JSON.stringify(changedList))
  }

  toggleItemDone = (id) => {
    const { list } = this.state
    const changedList = list
    const item = changedList.find((el) => el.id === id)
    if (item) {
      item.done = !item.done
    }

    this.setState({ list: changedList })
    window.localStorage.setItem('todoItems', JSON.stringify(changedList))
  }

  changeContent = (id, value) => {
    const { list } = this.state
    const changedList = list
    const item = changedList.find((el) => el.id === id)
    if (item) {
      item.content = value
    }

    this.setState({ list: changedList })
    window.localStorage.setItem('todoItems', JSON.stringify(changedList))
  }

  removeItem = (id) => {
    const { list } = this.state
    const changedList = list
    const index = changedList.findIndex((el) => el.id === id)
    if (index !== undefined) {
      changedList.splice(index, 1)
    }

    this.setState({ list: changedList })
    window.localStorage.setItem('todoItems', JSON.stringify(changedList))
  }

  removeDoneTodos = () => {
    const { list } = this.state
    const changedList = list.filter((el) => !el.done)
    this.setState({ list: changedList })
    window.localStorage.setItem('todoItems', JSON.stringify(changedList))
  }

  changeFilter = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { list, filter, newInputLabel } = this.state

    const listLength = list.length
    const doneListLength = list.filter((el) => el.done).length
    const itemLeft = listLength - doneListLength

    let listToRender = list
    if (filter !== 'All') {
      listToRender = listToRender.filter((el) => (filter === 'Active' ? !el.done : el.done))
    }

    const listItems = listToRender.map((el) => (
      <TodoItem
        key={el.id}
        id={el.id}
        done={el.done}
        content={el.content}
        toggle={this.toggleItemDone}
        changeContent={this.changeContent}
        removeItem={this.removeItem}
      />
    ))

    return (
      <div className={styles['list-container']}>
        <TodoInput
          inputValue={newInputLabel}
          listLength={listLength}
          doneListLength={doneListLength}
          onNewInputChange={this.handleChange}
          addItem={this.addNewItem}
          arrowClick={this.toggleAllItems}
        />
        <ul>{listItems}</ul>
        <TodoFooter
          itemsLength={listLength}
          itemsDone={doneListLength}
          itemsLeft={itemLeft}
          removeDoneTodos={this.removeDoneTodos}
          filter={filter}
          changeFilter={this.changeFilter}
        />
      </div>
    )
  }
}

export default TodoList
