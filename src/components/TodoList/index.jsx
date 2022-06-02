import React from "react";
import "./styles"
import TodoInput from "@/components/TodoInput";

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: 1,
      newInputLabel: "",
      list: []
    }
  }

  handleChange = (value) => {
    this.setState({ newInputLabel: value })
  }

  toggleAllItems = () => {
    const changedList = this.state.list
    const listLength = changedList.length
    const doneListLength = changedList.filter((el) => el.done).length
    const done = doneListLength < listLength;

    changedList.forEach((el) => { el.done = done })

    this.setState({ list: changedList });
  }

  addNewItem = (content) => {
    const changedList = this.state.list;
    const item = {
      id: this.state.itemId,
      done: false,
      content: content
    };
    changedList.push(item);

    this.setState({
      itemId: ++this.state.itemId,
      newInputLabel: "",
      list: changedList
    })
  }

  render() {
    const listLength = this.state.list.length
    const doneListLength = this.state.list.filter((el) => el.done).length

    return (
      <div className="list-container">
        <TodoInput
          inputValue={this.state.newInputLabel}
          listLength={listLength}
          doneListLength={doneListLength}
          onNewInputChange={this.handleChange}
          addItem={this.addNewItem}
          arrowClick={this.toggleAllItems}
        />
      </div>
    );
  }
}

export default TodoList;
