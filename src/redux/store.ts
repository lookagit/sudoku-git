import { grid, initialState } from './reducers'
import { createStore } from 'redux';


const store = createStore(grid, initialState)

export default store;