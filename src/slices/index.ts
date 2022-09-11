// src/slices/index.js
import { combineReducers } from 'redux'
import worksReducer from './works';

const rootReducer = combineReducers({
  works: worksReducer,
})

export default rootReducer
