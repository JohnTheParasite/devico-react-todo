import React from "react";
import "./styles";
import TodoList from "@/components/TodoList";

class Todo extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="header-label">todos</h1>
        </header>
        <TodoList />
      </div>
    )
  }
}

export default Todo
