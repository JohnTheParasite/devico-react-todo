import React from "react";
import styles from "./styles.module"
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
      list: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const storageData = window.localStorage.getItem("todoItems");
    const result = (storageData === null) ? [] : JSON.parse(storageData);
    let itemId = 1;
    if (result.length) {
      itemId = Math.max(...result.map(el => el.id)) + 1;
    }

    this.setState({ list: result, itemId: itemId } )
  }

  handleChange = (value) => {
    this.setState({ newInputLabel: value } )
  }

  toggleAllItems = () => {
    const changedList = this.state.list
    const listLength = changedList.length
    const doneListLength = changedList.filter((el) => el.done).length
    const done = doneListLength < listLength;

    changedList.forEach((el) => { el.done = done })

    this.setState({ list: changedList } );
    window.localStorage.setItem("todoItems", JSON.stringify(changedList));
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
    window.localStorage.setItem("todoItems", JSON.stringify(changedList));
  }

  toggleItemDone = (id) => {
    const changedList = this.state.list;
    const item = changedList.find((el) => el.id === id);
    if (item) {
      item.done = !item.done
    }

    this.setState( { list: changedList } )
    window.localStorage.setItem("todoItems", JSON.stringify(changedList));
  }

  changeContent = (id, value) => {
    const changedList = this.state.list;
    const item = changedList.find((el) => el.id === id);
    if (item) {
      item.content = value
    }

    this.setState( { list: changedList } )
    window.localStorage.setItem("todoItems", JSON.stringify(changedList));
  }

  removeItem = (id) => {
    const changedList = this.state.list;
    const index = changedList.findIndex((el) => el.id === id);
    if (index !== undefined) {
      changedList.splice(index, 1);
    }

    this.setState( { list: changedList } )
    window.localStorage.setItem("todoItems", JSON.stringify(changedList));
  }

  removeDoneTodos = () => {
    const changedList = this.state.list.filter((el) => !el.done);
    this.setState( { list: changedList } )
    window.localStorage.setItem("todoItems", JSON.stringify(changedList));
  }

  changeFilter = (filter) => {
    this.setState({ filter: filter} );
  }

  render() {
    const listLength = this.state.list.length
    const doneListLength = this.state.list.filter((el) => el.done).length
    const itemLeft = listLength - doneListLength;

    let listToRender = this.state.list;
    if (this.state.filter !== "All") {
      listToRender = listToRender.filter((el) => this.state.filter === "Active" ? !el.done : el.done)
    }

    const listItems = listToRender.map((el) =>
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
      <div className={styles["list-container"]}>
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
