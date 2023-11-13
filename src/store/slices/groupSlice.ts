import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Group } from '../../@types/entities/Group';
import groupApi from '../../api/group';

type GroupState = {
  groupList: Group[];
};

const initialState: GroupState = {
  groupList: [],
};

const GroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groupList.push(action.payload);
    },
    editGroup: (state, action) => {
      state.groupList = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        groupApi.endpoints.allGroups.matchFulfilled,
        (state, { payload }) => {
          state.groupList = payload
        },
      )
  }
});

export const { addGroup, editGroup } = GroupSlice.actions;
export const selectGroupList = (state: RootState): Group[] =>
  state.groupSlice.groupList;
export default GroupSlice.reducer;
