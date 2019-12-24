import React, { Component } from 'react'
import { connect } from 'react-redux'
import { delete_todo, edit_todo, toggle_edit } from '../store/actions/todoActions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

class Todoitem extends Component {

  state = {
    item: ''
  }

  handleEdit = (id, title) => {
    this.props.editTodo(edit_todo(id, title))
  }

  toggleEdit = (editItem, title) => {
    this.props.toggleEdit(toggle_edit(!editItem))
    this.initializeTitle(title)

  }

  handleDelete = (id) => {
    this.props.deleteTodo(delete_todo(id))
  }

  onChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }

  initializeTitle = (title) => {
    this.setState({
      item: title
    })
  }


  render() {
    console.log(this.props)
    let { id, title, editItem, startDateTime, endDateTime } = this.props
    let { item } = this.state

    return (
      <li className="list-group-item text-capitlize d-flex justify-content-between my-2">
        <h6>{title}</h6>
        <div className="todo-icon">
          <span className="mx-2 text-success" onClick={this.toggleEdit.bind(this, editItem, title)} >
            <i className="fas fa-pen"></i>
          </span>
          <span className="mx-2 text-danger" onClick={this.handleDelete.bind(this, id)}>
            <i className="fas fa-trash"></i>
          </span>
        </div>
        {/* {editItem ? <TodoEditItem /> : ''}
         */}
        <Modal isOpen={editItem}>
          <ModalHeader>Edit Todo Item</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Input type="textarea" name="text" value={item} onChange={this.onChange.bind(this)} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleEdit.bind(this, id, item)}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleEdit.bind(this, editItem)}> Cancel</Button>
          </ModalFooter>
        </Modal>
      </li>

    )
  }
}




const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: (delete_todo) => { dispatch(delete_todo) },
    editTodo: (edit_todo) => { dispatch(edit_todo) },
    toggleEdit: (toggle_edit) => { dispatch(toggle_edit) },
  }
}


export default connect(null, mapDispatchToProps)(Todoitem)