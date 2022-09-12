import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ExpandLevel } from '../models/Misc'
import { Work } from '../models/Work'

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

//Exports
export const { getWorks, getWorksSuccess, getWorksFailure } = worksSlice.actions
export const worksSelector = (state: any) => state.works
export default worksSlice.reducer

//Thunk
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

          console.log(response);

          let worksToReturn: Work | Work[];

          //Check if response.data.work is a property - if not return nothing
          if (!response?.data?.work) {
            dispatch(getWorksSuccess([]));
            return;
          }

          if (Array.isArray(response.data.work)) {
            worksToReturn = response.data.work.map((w: any) => {
              let newWork = new Work();
              newWork["@uri"] = w["@uri"] ?? ""
              newWork.authorweb = w.authorweb ?? "";
              newWork.onsaledate = w.onsaledate ?? "";
              newWork.titles = w.titles ?? "";
              newWork.titleAuth = w.titleAuth ?? "";
              newWork.titleSubtitleAuth = w.titleSubtitleAuth ?? "";
              newWork.titleshort = w.titleshort ?? "";
              newWork.titleweb = w.titleweb  ?? "";
              newWork.workid = w.workid ?? "";
              return newWork;
            });
          }
          else {

            worksToReturn = new Work()
            worksToReturn["@uri"] = response.data.work["@uri"] ?? "";
            worksToReturn.authorweb = response.data.work.authorweb ?? "";
            worksToReturn.onsaledate = response.data.work.onsaledate ?? "";
            worksToReturn.titles = response.data.work.titles ?? "";
            worksToReturn.titleAuth = response.data.work.titleAuth ?? "";
            worksToReturn.titleSubtitleAuth = response.data.work.titleSubtitleAuth ?? "";
            worksToReturn.titleshort = response.data.work.titleshort ?? "";
            worksToReturn.titleweb = response.data.work.titleweb ?? "";
            worksToReturn.workid = response.data.work.workid ?? "";
            return worksToReturn;
          }

          console.log(worksToReturn);

          dispatch(getWorksSuccess(worksToReturn));
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
