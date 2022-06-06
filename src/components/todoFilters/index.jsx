import React from "react";
import styles from "./styles.module"

class TodoFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    this.props.changeFilter(event.target.innerText)
  }

  render() {
    const filterAllClasses = `${styles.filter} ${this.props.filter === "All" ? styles.active : ""}`
    const filterActiveClasses = `${styles.filter} ${this.props.filter === "Active" ? styles.active : ""}`
    const filterCompletedClasses = `${styles.filter} ${this.props.filter === "Completed" ? styles.active : ""}`

    return (
      <div className={styles.filters}>
        <div
          className={filterAllClasses}
          onClick={this.handleClick}
        >All</div>
        <div
          className={filterActiveClasses}
          onClick={this.handleClick}
        >Active</div>
        <div
          className={filterCompletedClasses}
          onClick={this.handleClick}
        >Completed</div>
      </div>
    );
  }
}

export default TodoFilters;
