import React from "react";
import "./styles"
import TodoFilters from "@/components/todoFilters";

class TodoFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const footerClasses = "footer" + (this.props.itemsLength ? "" : " hidden");
    const removeDoneClasses = "remove-all-done" + (this.props.itemsDone ? "" : " hidden");

    return (
      <div className={footerClasses}>
        <div className="items-left">
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
