import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, retrieveTodos, retrieveColumn } from '../store/actions/todoActions'
// import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';
import './TodoInput.css'
import { notification } from 'antd';

class TodoInput extends Component {

  state = {
    item: '',
    startDateTime: '',
    endDateTime: '',
  }

  onChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)

    this.props.addTodo(this.state.item).then(() => {
      console.log("added todo")
      console.log(this.props)
      if (this.props.todo.addedPost.success) {
        this.setState({
          item: ""
        })
        notification.success({
          message: "Added Todo",
          description: "You have added a todo item",
          placement: "bottomRight",
        });
        this.props.retrieveTodos()
        this.props.retrieveColumn()
      }
    })
    // this.setState({
    //   item: ''
    // })
  }

  onChangeDate(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk = (value) => {
    console.log('onOk: ', value);
    console.log(value[0].toISOString())
    console.log(value[1])
    this.setState({
      startDateTime: value[0].toISOString(),
      endDateTime: value[1].toISOString()
    })
  }

  render() {
    let { item } = this.state
    // const { RangePicker } = DatePicker;

    return (
      <div className="card card-body my-3">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white">
                <i className="fas fa-book">
                  <i className="fas fa-camera"></i>
                </i>
              </div>
            </div>
            <input type="text" className="form-control" placeholder="Add a todo item"
              value={item} onChange={this.onChange}></input>
          </div>
          <div>
            <br />
            {/* <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="DD-MM-YYYY HH:mm"
              placeholder={['Start Time', 'End Time']}
              onChange={this.onChangeDate}
              onOk={this.onOk}
            /> */}
          </div>

          <button type="submit" disabled={!this.state.item}
            className="btn btn-block btn-primary mt-3">
            Add Item
          </button>
        </form>
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
    updateInput: (update_input) => { dispatch(update_input) },
    addTodo: (title) => { return dispatch(addTodo(title)) },
    retrieveTodos: () => { dispatch(retrieveTodos()) },
    retrieveColumn: () => { return dispatch(retrieveColumn()) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)