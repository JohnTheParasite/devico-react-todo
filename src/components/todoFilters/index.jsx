import React from "react";
import "./styles"

class TodoFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    this.props.changeFilter(event.target.innerText)
  }

  render() {
    const filterAllClasses = "filter" + (this.props.filter === "All" ? " active" : "");
    const filterActiveClasses = "filter" + (this.props.filter === "Active" ? " active" : "");
    const filterCompletedClasses = "filter" + (this.props.filter === "Completed" ? " active" : "");

    return (
      <div className="filters">
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
