import { createSlice } from '@reduxjs/toolkit';

import { Franchisee } from '../../@types/entities/Franchaisee';
import franchiseeApi from '../../api/franchaisee';
import { RootState } from '../store';

type FranchaiseeState = {
  data: Franchisee | null;
  franchaiseeList: Franchisee[];
};

const initialState: FranchaiseeState = {
  data: null,
  franchaiseeList: [],
};

const FranchiserSlice = createSlice({
  name: 'franchisee',
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        franchiseeApi.endpoints.allFranchaisee.matchFulfilled,
        (state, { payload }) => {
          state.franchaiseeList = payload
        },
      )
  }
});

export const { setUserData } = FranchiserSlice.actions;
export const selectFranchaiseeList = (state: RootState): Franchisee[] | null =>
  state.franchiseeSlice.franchaiseeList;
export default FranchiserSlice.reducer;
