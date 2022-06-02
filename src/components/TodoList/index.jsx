import React from "react";
import "./styles"
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import TodoFooter from "@/components/todoFooter";

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: 1,
      newInputLabel: "",
      filter: "All",
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

  toggleItemDone = (id) => {
    const changedList = this.state.list;
    const item = changedList.find((el) => el.id === id);
    if (item) {
      item.done = !item.done
    }

    this.setState( { list: changedList } )
  }

  changeContent = (id, value) => {
    const changedList = this.state.list;
    const item = changedList.find((el) => el.id === id);
    if (item) {
      item.content = value
    }

    this.setState( { list: changedList } )
  }

  removeItem = (id) => {
    const changedList = this.state.list;
    const index = changedList.findIndex((el) => el.id === id);
    if (index !== undefined) {
      changedList.splice(index, 1);
    }

    this.setState( { list: changedList } )
  }

  removeDoneTodos = () => {
    const changedList = this.state.list.filter((el) => !el.done);
    this.setState( { list: changedList } )
  }

  changeFilter = (filter) => {
    this.setState({ filter: filter});
  }

  // TODO: done todo should be txt-crossed and grey colored
  // TODO: Make filters do something
  // TODO: add localStorage
  // TODO: resolve focus() problem
  // TODO: read about how to pass properties through multiple children

  render() {
    const listLength = this.state.list.length
    const doneListLength = this.state.list.filter((el) => el.done).length
    const itemLeft = listLength - doneListLength;

    const listItems = this.state.list.map((el) =>
      <TodoItem
        key={el.id}
        id={el.id}
        done={el.done}
        content={el.content}
        toggle={this.toggleItemDone}
        changeContent={this.changeContent}
        removeItem={this.removeItem}
      />
    );

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
        <ul>{listItems}</ul>
        <TodoFooter
          itemsLength={listLength}
          itemsDone={doneListLength}
          itemsLeft={itemLeft}
          removeDoneTodos={this.removeDoneTodos}
          filter={this.state.filter}
          changeFilter={this.changeFilter}
        />
      </div>
    );
  }
}

export default TodoList;
