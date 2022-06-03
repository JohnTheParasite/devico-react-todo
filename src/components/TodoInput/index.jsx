import React from "react";
import styles from "./styles.module"

class TodoInput extends React.Component {

  constructor(props) {
    super(props);
  }

  getAdditionalArrowClass = () => {
    let classes = styles.arrow;
    if (this.props.listLength === 0) {
      classes = `${styles.arrow} ${styles.invisible}`;
    } else if (this.props.listLength === this.props.doneListLength) {
      classes = `${styles.arrow} ${styles.darker}`;
    }
    return classes;
  }

  handleChange = (event) => {
    this.props.onNewInputChange(event.target.value);
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      this.props.addItem(event.target.value.trim());
    }
  }

  render() {
    const inputValue = this.props.inputValue;
    const arrowClasses = this.getAdditionalArrowClass();

    return (
      <div className={styles.input}>
        <div
          className={arrowClasses}
          onClick={this.props.arrowClick}
        />
        <input
          name="newItemLabel"
          className={styles["add-input"]}
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default TodoInput;
