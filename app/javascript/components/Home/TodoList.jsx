import React, { Component } from 'react'
import TodoItem from './TodoItem'
import { connect } from 'react-redux'
import { clear_todo } from '../store/actions/todoActions'

class Todolist extends Component {

  clearList = (e) => {
    e.preventDefault()
    this.props.clearList(clear_todo());
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps)
  //   return true
  //   // return nextProps.isFavourite != this.props.isFavourite;
  // }

  render() {
    const { items, editItem } = this.props.todo
    return (
      <ul className="list-group my-5">
        <h3 className="text-capitalize text-center">
          Todo List
        </h3>
        {
          items.map((item) => {

            return (<TodoItem key={item.id} title={item.title}
              id={item.id}
              onChange={this.handleChange}
              editItem={editItem} />)
          })
        }

        {/* <button className="btn btn-danger btn-block text-capitalize mt-5" onClick={this.clearList}> Clear List </button> */}
      </ul>
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
    clearList: (clear_todo) => { dispatch(clear_todo) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Todolist)
