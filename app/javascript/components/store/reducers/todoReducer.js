import uuid from 'uuid'

const todoReducer = (state = [], { type, payload }) => {
  switch (type) {

    case 'ADD_TODO':
      return Object.assign({}, state, {
        items: [...state.items, {
          id: uuid(),
          title: payload.item,
          startDateTime: payload.startDateTime,
          endDateTime: payload.startDateTime
        }],
        item: ''
      })
    case 'CLEAR_TODO':
      return Object.assign({}, state, { items: [] })

    case 'DELETE_TODO':
      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== payload)
      })

    case 'EDIT_TODO':
      return Object.assign({}, state, {
        items: state.items.map(item => item.id === payload.id ? { ...item, title: payload.title } : item),
        editItem: !state.editItem
      })

    case 'TOGGLE_EDIT':
      return Object.assign({}, state, {
        editItem: payload
      })
    default:
      return state;
  }
}
export default todoReducer;