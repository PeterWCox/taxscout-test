// src/slices/index.js
import { combineReducers } from 'redux'
import recipes from './recipes';
import worksReducer from './works';
import recipesReducer from './recipes';


const rootReducer = combineReducers({
  works: worksReducer,
  recipes: recipesReducer
})

export default rootReducer
