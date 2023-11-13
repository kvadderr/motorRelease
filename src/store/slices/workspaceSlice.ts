import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import workspaceApi from '../../api/workspace';
import { Workspace } from '../../@types/entities/Workspace';

type WorkspaceState = {
  workspaceList: Workspace[];
};

const initialState: WorkspaceState = {
  workspaceList: [],
};

const WorkspaceSlice = createSlice({
  name: 'workspace',
  initialState,

  reducers: {
    addWorkspace: (state, action) => {
      state.workspaceList.push(action.payload);
    },
    editWorkspace: (state, action) => {
      state.workspaceList = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        workspaceApi.endpoints.allWorkspace.matchFulfilled,
        (state, { payload }) => {
          state.workspaceList = payload
        },
      )
  }
});

export const { addWorkspace, editWorkspace } = WorkspaceSlice.actions;
export const selectWorkspaceList = (state: RootState): Workspace[] =>
  state.workspaceSlice.workspaceList;
export default WorkspaceSlice.reducer;
