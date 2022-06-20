import React from 'react'
import { connect } from 'react-redux'
import TodoFilters from '@/components/todoFilters'
import styles from './styles.module.scss'

class TodoFooter extends React.Component {
  render() {
    const { lengths, removeDoneTodos } = this.props

    const footerClasses = `${styles.footer} ${lengths.all ? '' : styles.hidden}`
    const removeDoneClasses = `${styles['remove-all-done']} ${lengths.completed ? '' : styles.hidden}`

    return (
      <div className={footerClasses}>
        <div className={styles['items-left']}>{lengths.active} items left</div>
        <TodoFilters />
        <div>
          <div className={removeDoneClasses} onClick={removeDoneTodos} role="button" tabIndex={0}>
            Clear completed
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lengths: state.taskList.lengths,
  }
}

export default connect(mapStateToProps)(TodoFooter)
