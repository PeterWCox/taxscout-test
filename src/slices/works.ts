import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  works: [],
}

// A slice for recipes with our three reducers
const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    getWorks: state =>
    {
      state.loading = true
    },
    getWorksSuccess: (state, { payload }) =>
    {
      state.works = payload
      state.loading = false
      state.hasErrors = false
    },
    getWorksFailure: state =>
    {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getWorks, getWorksSuccess, getWorksFailure } = worksSlice.actions

// A selector
export const worksSelector = (state: any) => state.recipes

// The reducer
export default worksSlice.reducer

// Asynchronous thunk action
export function fetchRecipes()
{
  return async (dispatch: any) =>
  {
    dispatch(getWorks())

    try
    {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json()

      dispatch(getWorksSuccess(data.meals))
    } catch (error)
    {
      dispatch(getWorksFailure())
    }
  }
}
