import React from 'react'
import styles from './styles.module.scss'

class TodoItem extends React.Component {
  constructor(props) {
    super(props)

    this.inputEdit = React.createRef()
    this.state = {
      edit: false,
    }
  }

  componentDidUpdate(prevState) {
    const { edit } = this.state
    if (prevState.edit !== edit && edit) {
      this.inputEdit.current.focus()
    }
  }

  toggleDone = () => {
    const { id, done, content, changeTask } = this.props
    changeTask(id, !done, content)
  }

  changeContent = (event) => {
    const { id, changeContent } = this.props
    const newContent = event.target.value.trim()
    changeContent(id, newContent)
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.beforeChangeContent()
    }
  }

  beforeChangeContent = () => {
    const { id, done, changeTask, removeItem } = this.props
    const newContent = this.inputEdit.current.value.trim()

    if (newContent) {
      changeTask(id, done, newContent)

      this.setState({ edit: false })
    } else {
      removeItem(id)
    }
  }

  toggleEdit = () => {
    const { edit } = this.state
    this.setState({ edit: !edit })
  }

  removeTodo = () => {
    const { id, removeItem } = this.props
    removeItem(id)
  }

  render() {
    const { edit } = this.state
    const { done, content } = this.props

    const previewClasses = `${styles.preview} ${edit ? styles.hidden : ''}`
    const editInputClasses = `${styles.edit} ${!edit ? styles.hidden : ''}`
    const listItemClasses = `${styles['list-item']} ${done ? styles.done : ''}`

    return (
      <li className={listItemClasses}>
        <div className={previewClasses}>
          <input type="checkbox" className={styles.checkbox} value={done} checked={done} onChange={this.toggleDone} />
          <p className={styles.paragraph} onDoubleClick={this.toggleEdit}>
            {content}
          </p>
          <div className={styles.remove} onClick={this.removeTodo} role="button" tabIndex={0}>
            ×
          </div>
        </div>

        <input
          type="text"
          ref={this.inputEdit}
          className={editInputClasses}
          value={content}
          onChange={this.changeContent}
          onBlur={this.beforeChangeContent}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  }
}

export default TodoItem
