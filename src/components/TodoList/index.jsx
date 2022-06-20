import React from 'react'
import { connect } from 'react-redux'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import { addTodo, changeTodo, changeTodoContent, deleteTodo, deleteCompletedTodos } from '@/redux/actions'
import styles from './styles.module.scss'

class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newInputLabel: '',
    }
  }

  handleChange = (value) => {
    this.setState({ newInputLabel: value })
  }

  addNewItem = (content) => {
    const { addTodoElement } = this.props
    addTodoElement(content)
    this.setState({
      newInputLabel: '',
    })
  }

  changeTask = (id, done, content) => {
    const { changeTodoElement } = this.props
    changeTodoElement(id, done, content)
  }

  changeContent = (id, value) => {
    const { changeContentElement } = this.props
    changeContentElement(id, value)
  }

  removeItem = (id) => {
    const { deleteTodoElement } = this.props
    deleteTodoElement(id)
  }

  removeDoneTodos = () => {
    const { deleteCompletedTodoElements } = this.props
    deleteCompletedTodoElements()
  }

  render() {
    const { newInputLabel } = this.state
    const { todos, filter } = this.props

    let listToRender = todos
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
        <TodoInput inputValue={newInputLabel} onNewInputChange={this.handleChange} addItem={this.addNewItem} />
        <ul>{listItems}</ul>
        <TodoFooter removeDoneTodos={this.removeDoneTodos} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.taskList.todos,
    lengths: state.taskList.lengths,
    filter: state.filterReducer.filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoElement: (content) => {
      dispatch(addTodo(content))
    },
    changeTodoElement: (id, done, content) => {
      dispatch(changeTodo(id, done, content))
    },
    changeContentElement: (id, content) => {
      dispatch(changeTodoContent(id, content))
    },
    deleteTodoElement: (id) => {
      dispatch(deleteTodo(id))
    },
    deleteCompletedTodoElements: () => {
      dispatch(deleteCompletedTodos())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
