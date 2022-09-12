import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ExpandLevel } from '../models/Misc'
import { Work, WorkResponse } from '../models/Work'
import { IWorksRepository, WorksRepository_API } from '../repositories/WorksRepository'

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

    const repo: IWorksRepository = new WorksRepository_API();

    if (searchTerm === "") {
      dispatch(getWorksSuccess([]));
      return;
    }

    const response: WorkResponse = await repo.getWorks(searchTerm);

    if (response.errorMessage) {
      dispatch(getWorksFailure())
    }

    dispatch(getWorksSuccess(response.work))

    dispatch(getWorksFailure())
  }
}
