import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '@/redux/actions'
import styles from './styles.module.scss'

class TodoFilters extends React.Component {
  handleClick = (event) => {
    const { changeFilter } = this.props
    changeFilter(event.target.innerText)
  }

  render() {
    const { filter } = this.props

    const filterAllClasses = `${styles.filter} ${filter === 'All' ? styles.active : ''}`
    const filterActiveClasses = `${styles.filter} ${filter === 'Active' ? styles.active : ''}`
    const filterCompletedClasses = `${styles.filter} ${filter === 'Completed' ? styles.active : ''}`

    return (
      <div className={styles.filters}>
        <div className={filterAllClasses} onClick={this.handleClick} role="button" tabIndex="0">
          All
        </div>
        <div className={filterActiveClasses} onClick={this.handleClick} role="button" tabIndex="0">
          Active
        </div>
        <div className={filterCompletedClasses} onClick={this.handleClick} role="button" tabIndex="0">
          Completed
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filterReducer.filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilter: (filter) => {
      dispatch(setFilter(filter))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilters)
