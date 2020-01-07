export const add_todo = (userInput) => {
  return { type: 'ADD_TODO', payload: userInput }
}

export const clear_todo = () => {
  return { type: 'CLEAR_TODO', payload: '' }
}

export const delete_todo = (id) => {
  return { type: 'DELETE_TODO', payload: id }
}

export const edit_todo = (id, title) => {
  return { type: 'EDIT_TODO', payload: { id: id, title: title } }
}

export const toggle_edit = (toggle) => {
  return { type: 'TOGGLE_EDIT', payload: toggle }
}

export function retrieveTodos() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_START' })
    return fetch('/api/posts', {
      method: 'get'
    }).then(response => response.json())
      .then(todos => {
        console.log(todos)
        dispatch({ type: "RECEIVE_POSTS", payload: todos })
      })
  }
}

export function addTodo(title) {
  return (dispatch) => {
    dispatch({ type: 'ADD_POST_START' })
    return new Promise((resolve, reject) => {
      fetch('/api/posts', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title
        })
      }).then(response => response.json())
        .then(result => {
          dispatch({ type: "ADDED_POST", payload: result })
          resolve()
        })
    })
  }
}

export function deleteTodo(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_POST_START' })
    return new Promise((resolve, reject) => {
      fetch('/api/posts', {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id
        })
      }).then(response => response.json())
        .then(result => {
          dispatch({ type: "DELETED_POST", payload: result })
          resolve()
        })
    })
  }
}

export function editTodo(id, title) {
  return (dispatch) => {
    dispatch({ type: 'EDIT_POST_START' })
    return new Promise((resolve, reject) => {
      fetch('/api/posts', {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          title: title
        })
      }).then(response => response.json())
        .then(result => {
          dispatch({ type: "EDITED_POST", payload: result })
          resolve()
        })
    })
  }
}

export function retrieveColumn() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_COLUMN_START' })
    return fetch('/api/posts-column', {
      method: 'get'
    }).then(response => response.json())
      .then(columns => {
        console.log(columns)
        dispatch({ type: "RECEIVED_COLUMN", payload: columns })
      })
  }
}
