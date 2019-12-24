import { createStore, combineReducers } from 'redux'
import todoReducer from './reducers/todoReducer'

const allReducer = combineReducers({ todo: todoReducer })
const initialStates = {
  todo: {
    items: [],
    id: '',
    item: '',
    editItem: false,
    date: null,
    startDateTime: '',
    endDateTime: '',
  }
}
const store = createStore(allReducer, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store