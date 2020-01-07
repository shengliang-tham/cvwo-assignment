import React, { Component } from 'react'
import './Task.css'
import { Draggable } from 'react-beautiful-dnd'

export default class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id.toString()} index={this.props.index}>
        {(provided, snapshot) => (
          <div className={snapshot.isDragging ? "dragging-task" : "task-container"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.task.title}
          </div>
        )}
      </Draggable>

    )
  }
}
