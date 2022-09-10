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
export function fetchWorks()
{
  return async (dispatch: any) =>
  {
    dispatch(getWorks())


    try
    {
      //Works
      let works: any = [];

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
          works = response.data.work;
          dispatch(getWorksSuccess(works))
        })
        .catch((error) => {
          console.log(error);
        });
      }
      await getWorks(0, 10, ExpandLevel.LinksAndDetails, "Harry");
      // console.log("WORKS");


    } catch (error)
    {
      dispatch(getWorksFailure())
    }
  }
}
