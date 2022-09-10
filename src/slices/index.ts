// src/slices/index.js
import { combineReducers } from 'redux'
import recipesReducer from './recipes'
import worksReducer from './works';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  works: worksReducer,
})

export default rootReducer
