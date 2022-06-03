import React from "react";
import styles from "./styles.module"

class TodoItem extends React.Component {

  constructor(props) {
    super(props);

    this.inputEdit = React.createRef();
    this.state = {
      edit: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.edit !== this.state.edit && this.state.edit) {
      this.inputEdit.current.focus();
    }
  }

  toggleDone = () => {
    this.props.toggle(this.props.id);
  }

  changeContent = (event) => {
    let newContent = event.target.value.trim()
    this.props.changeContent(this.props.id, newContent);
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.beforeChangeContent()
    }
  }

  beforeChangeContent = () => {
    const newContent = event.target.value.trim()

    if (newContent) {
      this.props.changeContent(this.props.id, newContent);

      this.setState({ edit: false })
    } else {
      this.props.removeItem(this.props.id)
    }
  }

  toggleEdit = () => {
    const newEditState = !this.state.edit;
    this.setState({ edit: newEditState } )
  }

  removeTodo = () => {
    this.props.removeItem(this.props.id)
  }

  render() {
    const previewClasses = `${styles.preview} ${(this.state.edit ? styles.hidden : "")}`;
    const editInputClasses = `${styles.edit} ${(!this.state.edit ? styles.hidden : "")}`;
    const listItemClasses = `${styles['list-item']} ${(this.props.done ? styles.done : "")}`;

    return (
      <li className={listItemClasses}>
        <div className={previewClasses}>
          <input
            type="checkbox"
            className={styles.checkbox}
            value={this.props.done}
            checked={this.props.done}
            onChange={this.toggleDone}
          />
          <p
            className={styles.paragraph}
            onDoubleClick={this.toggleEdit}
          >{this.props.content}</p>
          <div
            className={styles.remove}
            onClick={this.removeTodo}
          >×</div>
        </div>

        <input
          type="text"
          ref={this.inputEdit}
          className={editInputClasses}
          value={this.props.content}
          onChange={this.changeContent}
          onBlur={this.beforeChangeContent}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}

export default TodoItem;
