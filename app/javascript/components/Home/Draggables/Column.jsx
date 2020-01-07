import React, { Component } from 'react'
import './Column.css'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

class Column extends Component {

  render() {
    return (
      // <Draggable draggableId={this.props.column.id} index={this.props.index}>
      // {(provided) => (
      // <div className="todo-container col-3" {...provided.draggableProps} ref={provided.innerRef}>
      <div className="todo-container col-3">
        {/* <h3 className="title" {...provided.dragHandleProps} type="task"> */}
        <h3 className="title" type="task">
          {this.props.column.title}
        </h3>

        <Droppable droppableId={this.props.column.id} >
          {(provided, snapshot) => (
            <div className={snapshot.isDraggingOver ? "dragging-over" : "task-list"} ref={provided.innerRef} {...provided.droppableProps}>

              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}

            </div>
          )}
        </Droppable>
      </div>
      // )}
      // </Draggable>
    )
  }
}

export default Column