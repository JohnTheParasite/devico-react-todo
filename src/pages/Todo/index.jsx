import React from "react";
import "./styles";
import TodoList from "@/components/TodoList";
import logo from "@/../public/logo.svg"

class Todo extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="header-label">todos on</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <TodoList />
      </div>
    )
  }
}

export default Todo
