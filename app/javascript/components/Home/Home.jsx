import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import Column from './Draggables/Column'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import { notification, Spin, } from 'antd';


class Home extends Component {
  // state = {
  //   items: [],
  //   id: uuid(),
  //   item: '',
  //   editItem: false,
  //   date: null
  // }

  state = {
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch('/api/retrieve-posts', {
      method: 'get'
    }).then(response => response.json())
      .then(posts => {
        if (posts.status_code === "401") {
          notification.error({
            message: "Error",
            description: posts.error,
            placement: "bottomRight",
          });
          this.props.history.push('/');
        }
      })
  }

  // handleChange = (e) => {
  //   this.setState({
  //     item: e.target.value
  //   })
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let newItem = {
  //     id: this.state.id,
  //     title: this.state.item
  //   }

  //   let updateditems = [...this.state.items, newItem];
  //   this.setState({
  //     items: updateditems,
  //     item: '',
  //     id: uuid(),
  //     editItem: false
  //   })
  // }

  // clearList = () => {
  //   this.setState({
  //     items: []
  //   })
  // }

  // handleDelete = (id) => {
  //   let filteredItems = this.state.items.filter(item => item.id !== id)
  //   this.setState({
  //     items: filteredItems
  //   })
  // }

  // handleEdit = (id) => {
  //   let filteredItems = this.state.items.filter(item => item.id !== id)
  //   let selectedItem = this.state.items.find(item => item.id === id)
  //   this.setState({
  //     items: filteredItems,
  //     item: selectedItem.title,
  //     editItem: true,
  //     id: id
  //   })
  // }
  //ASDASD

  state = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch our favourite show' },
      'task-3': { id: 'task-3', content: 'Charge phone' },
      'task-4': { id: 'task-4', content: 'Eat dinner' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: []
      },

    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    //No change
    if (!destination) {
      return
    }

    //No Change as it is the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = { ...this.state, columnOrder: newColumnOrder }
      this.setState(newState)
      return
    }

    const start = this.state.columns[source.droppableId]
    const end = this.state.columns[destination.droppableId]

    if (start === end) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = { ...start, taskIds: newTaskIds }
      const newState = { ...this.state, columns: { ...this.state.columns, [newColumn.id]: newColumn } }

      this.setState(newState)
      return
    }

    //Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = { ...start, taskIds: startTaskIds }

    const finishTaskIds = Array.from(end.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newEnd = { ...end, taskIds: finishTaskIds }
    const newState = {
      ...this.state, columns:
      {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    }

    this.setState(newState)
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-10 mx-auto col-md-8 mt-4"> */}
            <div className="col-4">
              <h3 className="text-capitalize text-center">
                Todo Input
              </h3>
              <TodoInput />
              <TodoList />
            </div>
            <div className="col-8">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                  {(provided) => (
                    <div className="row" {...provided.droppableProps} ref={provided.innerRef}>
                      {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId]
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                        return <Column key={column.id} column={column} tasks={tasks} index={index} />
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     todo: state.todo
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     addTodo: () => { dispatch(add_todo) }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default Home