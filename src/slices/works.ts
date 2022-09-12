import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Work } from '../models/Author'
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
          url: "https://reststop.randomhouse.com/resources/works",
          params: {
            start: start,
            max: end,
            expandLevel: expandLevel,
            search: search
          },
          headers: { 
            'Accept': 'application/json'
          }
        };
        
        axios(config)
        .then((response) => {
          console.log(response)
          const works = response.data.work.map((work: any) => {
            const newWork = new Work();
            newWork["@uri"] = work["@uri"];
            newWork.authorweb = work.authorweb;
            newWork.onsaledate = work.onsaledate;
            newWork.titles = work.titles;
            newWork.titleAuth = work.titleAuth;
            newWork.titleSubtitleAuth = work.titleSubtitleAuth;
            newWork.titleshort = work.titleshort;
            newWork.titleweb = work.titleweb;
            newWork.workid = work.workid;
            return newWork;
          });
          console.log(works);
          dispatch(getWorksSuccess(works));
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
