import React from 'react'
import { connect } from 'react-redux'
import { toggleAllTodos } from '@/redux/actions'
import styles from './styles.module.scss'

class TodoInput extends React.Component {
  getAdditionalArrowClass = () => {
    const { lengths } = this.props

    let classes = styles.arrow
    if (lengths.all === 0) {
      classes = `${styles.arrow} ${styles.invisible}`
    } else if (lengths.all === lengths.completed) {
      classes = `${styles.arrow} ${styles.darker}`
    }
    return classes
  }

  handleChange = (event) => {
    const { onNewInputChange } = this.props
    onNewInputChange(event.target.value)
  }

  handleKeyDown = (event) => {
    const { addItem } = this.props
    if (event.key === 'Enter' && event.target.value.trim()) {
      addItem(event.target.value.trim())
    }
  }

  toggleAllItems = () => {
    const { toggleAllTodoElements, lengths } = this.props
    const done = lengths.completed < lengths.all
    toggleAllTodoElements(done)
  }

  render() {
    const { inputValue } = this.props
    const arrowClasses = this.getAdditionalArrowClass()

    return (
      <div className={styles.input}>
        <div className={arrowClasses} onClick={this.toggleAllItems} role="button" tabIndex={0} />
        <input
          name="newItemLabel"
          className={styles['add-input']}
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lengths: state.taskList.lengths,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAllTodoElements: (done) => {
      dispatch(toggleAllTodos(done))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)
