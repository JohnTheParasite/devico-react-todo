import React from 'react'
import styles from './styles.module.scss'

class TodoInput extends React.Component {
  getAdditionalArrowClass = () => {
    const { listLength, doneListLength } = this.props

    let classes = styles.arrow
    if (listLength === 0) {
      classes = `${styles.arrow} ${styles.invisible}`
    } else if (listLength === doneListLength) {
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

  render() {
    const { inputValue, arrowClick } = this.props
    const arrowClasses = this.getAdditionalArrowClass()

    return (
      <div className={styles.input}>
        <div className={arrowClasses} onClick={arrowClick} role="button" tabIndex={0} />
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

export default TodoInput
