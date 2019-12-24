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
