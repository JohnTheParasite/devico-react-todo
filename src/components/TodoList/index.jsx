import React from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import { Api, catchAxiosError } from '@/services/api'
import styles from './styles.module.scss'

class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newInputLabel: '',
      filter: 'All',
      list: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  validateResponseListAndSetState = (res) => {
    if (res && res.data.length) {
      this.setState({ list: res.data })
    } else {
      this.setState({ list: [] })
    }
  }

  getData = () => {
    Api.get('/api/tasks')
      .then(this.validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  handleChange = (value) => {
    this.setState({ newInputLabel: value })
  }

  toggleAllItems = () => {
    const { list } = this.state

    const listLength = list.length
    const doneListLength = list.filter((el) => el.done).length
    const done = doneListLength < listLength

    Api.put('/api/tasks/bulk/update', { done })
      .then(this.validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  addNewItem = (content) => {
    Api.post('/api/tasks', { content })
      .then(this.validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
    this.setState({
      newInputLabel: '',
    })
  }

  changeTask = (id, done, content) => {
    Api.put(`/api/tasks/${id}`, { done, content })
      .then(this.validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  changeContent = (id, value) => {
    const { list } = this.state
    const changedList = list
    const item = changedList.find((el) => el.id === id)
    if (item) {
      item.content = value
    }

    this.setState({ list: changedList })
  }

  removeItem = (id) => {
    Api.delete(`/api/tasks/${id}`)
      .then(this.validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  removeDoneTodos = () => {
    Api.delete('/api/tasks/bulk/delete')
      .then(this.validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
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
        changeTask={this.changeTask}
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
