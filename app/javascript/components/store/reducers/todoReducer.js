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

    case 'RETRIEVE_TODOS':
      console.log("testest")
      dispatch({ type: 'FETCH_POSTS_START' })

      fetch('/api/posts', {
        method: 'get'
      }).then(response => response.json())
        .then(todos => {
          dispatch({ type: "RECEIVE_POSTS", payload: todos })
          // if (todos.status_code === "401") {
          //   return Object.assign({}, state, {
          //     statusCode: "401",
          //     errorMessage: todos.error
          //   })
          // } else {
          //   return Object.assign({}, state, {
          //     items: todos,
          //     statusCode: "200"
          //   })
          // }
        })
    default:
      return state;
  }


}
export default todoReducer;