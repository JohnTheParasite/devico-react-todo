import React from "react";
import "./styles"

class TodoInput extends React.Component {

  constructor(props) {
    super(props);
  }

  getAdditionalArrowClass = () => {
    let className = "arrow";
    if (this.props.listLength === 0) {
      className += " invisible";
    } else if (this.props.listLength === this.props.doneListLength) {
      className += " darker"
    }
    return className;
  }

  handleChange = (event) => {
    this.props.onNewInputChange(event.target.value);
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.props.addItem(event.target.value);
    }
  }

  render() {
    const inputValue = this.props.inputValue;
    const arrowClasses = this.getAdditionalArrowClass();

    return (
      <div className="input">
        <div
          className={arrowClasses}
          onClick={this.props.arrowClick}
        />
        <input
          name="newItemLabel"
          className="add-input"
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
