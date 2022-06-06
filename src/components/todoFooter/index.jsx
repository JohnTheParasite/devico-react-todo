import React from "react";
import styles from "./styles.module"
import TodoFilters from "@/components/todoFilters";

class TodoFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const footerClasses = `${styles.footer} ${(this.props.itemsLength ? "" : styles.hidden)}`
    const removeDoneClasses = `${styles["remove-all-done"]} ${(this.props.itemsDone ? "" : styles.hidden)}`;

    return (
      <div className={footerClasses}>
        <div className={styles["items-left"]}>
          {this.props.itemsLeft} items left
        </div>
        <TodoFilters
          filter={this.props.filter}
          changeFilter={this.props.changeFilter}
        />
        <div>
          <div
            className={removeDoneClasses}
            onClick={this.props.removeDoneTodos}
          >
            Clear completed
          </div>
        </div>
      </div>
    );
  }
}

export default TodoFooter;
