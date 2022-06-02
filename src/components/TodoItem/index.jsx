import React from "react";
import "./styles"

class TodoItem extends React.Component {

  constructor(props) {
    super(props);

    this.inputEdit = React.createRef();
    this.state = {
      edit: false
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
    this.setState({ edit: newEditState })
    if (newEditState) {
      this.inputEdit.current.focus();
    }
  }

  removeTodo = () => {
    this.props.removeItem(this.props.id)
  }

  render() {
    const previewClasses = "preview" + (this.state.edit ? " hidden" : "");
    const editInputClasses = "edit" + (this.state.edit ? "" : " hidden");

    return (
      <li className="list-item">
        <div className={previewClasses}>
          <input
            type="checkbox"
            className="checkbox"
            value={this.props.done}
            checked={this.props.done}
            onChange={this.toggleDone}
          />
          <p
            className="paragraph"
            onDoubleClick={this.toggleEdit}
          >{this.props.content}</p>
          <div
            className="remove"
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
