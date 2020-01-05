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

    case 'FETCH_POSTS_START':
      return Object.assign({}, state, {
        loading: true
      })
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        loading: false,
        items: payload
      })
    case 'FETCH_POSTS_ERROR':
      return Object.assign({}, state, {
        loading: false,
        error: payload
      })

    case 'ADD_POST_START':
      return Object.assign({}, state, {
        loading: true
      })

    case 'ADDED_POST':
      return Object.assign({}, state, {
        loading: false,
        addedPost: payload
      })

    case 'DELETE_POST_START':
      return Object.assign({}, state, {
        loading: true
      })

    case 'DELETED_POST':
      return Object.assign({}, state, {
        loading: false,
        deletedPost: payload
      })

    case 'EDIT_POST_START':
      return Object.assign({}, state, {
        loading: true
      })

    case 'EDITED_POST':
      return Object.assign({}, state, {
        loading: false,
        editedPost: payload
      })

    default:
      return state;
  }


}
export default todoReducer;