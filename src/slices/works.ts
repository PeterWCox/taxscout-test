import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ExpandLevel } from '../models/Misc'

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
export const worksSelector = (state: any) => state.works

// The reducer
export default worksSlice.reducer

// Asynchronous thunk action
export function fetchWorks(searchTerm: string)
{
  return async (dispatch: any) =>
  {
    dispatch(getWorks())


    try
    {

      const getWorks = async (start: number, end: number, expandLevel: ExpandLevel, search: string): Promise<void> => {
        var config = {
          method: 'get',
          url: `https://reststop.randomhouse.com/resources/works?
            start=${start}&
            max=${end}&
            expandLevel=${expandLevel}&
            search=${search}`.replace(/\s/g, ""),
          headers: { 
            'Accept': 'application/json'
          }
        };
        
        axios(config)
        .then((response) => {
          console.log(response)
          dispatch(getWorksSuccess(response.data.work))
        })
        .catch((error) => {
          console.log(error);
        });
      }
    
      if (searchTerm.trim() !== "") {
        await getWorks(0, 3, ExpandLevel.LinksAndDetails, `${searchTerm}`);
      }
      else {
        dispatch(getWorksSuccess([]));
      }

    } catch (error)
    {
      dispatch(getWorksFailure())
    }
  }
}
