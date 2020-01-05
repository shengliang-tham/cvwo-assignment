import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodo, retrieveTodos, edit_todo, toggle_edit } from '../store/actions/todoActions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { notification } from 'antd';

class Todoitem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      editedTitle: props.title
    }
  }


  handleEdit = (id, title) => {
    this.props.editTodo(edit_todo(id, title))
  }

  // toggleEdit = (editItem, title) => {
  //   this.props.toggleEdit(toggle_edit(!editItem))
  //   // this.initializeTitle(title)

  // }

  handleDelete = (id) => {
    console.log(id)
    this.props.deleteTodo(id).then(() => {
      if (this.props.todo.deletedPost.success) {
        notification.success({
          message: "Deleted Todo",
          description: "You have deleted a todo item",
          placement: "bottomRight",
        });
        this.props.retrieveTodos()
      }
    })
  }

  onChange = (e) => {
    this.setState({
      editedTitle: e.target.value
    })
  }

  render() {
    let { id, title } = this.props

    return (
      <div>
        <li className="list-group-item text-capitlize d-flex justify-content-between my-2">
          <h6>{title}</h6>
          <div className="todo-icon">
            {/* <span className="mx-2 text-success" onClick={this.toggleEdit.bind(this, editItem)} >
              <i className="fas fa-pen"></i>
            </span> */}
            <span className="mx-2 text-success" onClick={() => this.setState({ open: true })} >
              <i className="fas fa-pen"></i>
            </span>
            <span className="mx-2 text-danger" onClick={this.handleDelete.bind(this, id)}>
              <i className="fas fa-trash"></i>
            </span>
          </div>

          <Modal isOpen={this.state.open}>
            <ModalHeader>Edit Todo Item</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Input type="textarea" name="text" value={this.state ? this.state.editedTitle : ""} onChange={this.onChange} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleEdit.bind(this, id, this.state.editedTitle)}>Save</Button>{' '}
              <Button color="secondary" onClick={() => this.setState({ open: false, editedTitle: title })}> Cancel</Button>
            </ModalFooter>
          </Modal>
        </li>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: (id) => { return dispatch(deleteTodo(id)) },
    editTodo: (edit_todo) => { dispatch(edit_todo) },
    retrieveTodos: () => { dispatch(retrieveTodos()) }
    // toggleEdit: (toggle_edit) => { dispatch(toggle_edit) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Todoitem)