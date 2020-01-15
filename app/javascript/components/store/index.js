import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import todoReducer from './reducers/todoReducer'
import thunk from 'redux-thunk';

const allReducer = combineReducers({ todo: todoReducer })
const initialStates = {
  todo: {
    items: [],
    id: '',
    item: '',
    date: null,
    startDateTime: '',
    endDateTime: '',
    error: null,
    loading: false,
    search: []
  }
}
// const store = createStore(allReducer, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const reduxDev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(allReducer, initialStates, compose(applyMiddleware(thunk), reduxDev));
export default store