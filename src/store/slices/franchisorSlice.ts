import { createSlice } from '@reduxjs/toolkit';

import { Franchaisor } from '../../@types/entities/Franchaisor';
import franchisorApi from '../../api/franchaisor';
import { RootState } from '../store';

type FranchaisorState = {
  franchaisorList: Franchaisor[];
};

const initialState: FranchaisorState = {
  franchaisorList: [],
};

const FranchiserSlice = createSlice({
  name: 'franchisor',
  initialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        franchisorApi.endpoints.allFranchaisor.matchFulfilled,
        (state, { payload }) => {
          state.franchaisorList = payload
        },
      )
  }
});

export const selectFranchaisorList = (state: RootState): Franchaisor[] | null =>
  state.franchisorSlice.franchaisorList;
export default FranchiserSlice.reducer;
