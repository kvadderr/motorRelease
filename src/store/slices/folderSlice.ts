import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import folderApi from '../../api/folder';
import { Folder } from '../../@types/entities/Folder';

type FolderState = {
  folderList: Folder[];
  currentFolder: Folder | null;
};

const initialState: FolderState = {
  folderList: [],
  currentFolder: null
};

const FolderSlice = createSlice({
  name: 'folder',
  initialState,

  reducers: {
    addFolder: (state, action) => {
      state.folderList.push(action.payload);
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        folderApi.endpoints.allFolders.matchFulfilled,
        (state, { payload }) => {
          state.folderList = payload
        },
      )
  }
});

export const { addFolder, setCurrentFolder } = FolderSlice.actions;
export const selectFolderList = (state: RootState): Folder[] | null =>
  state.folderSlice.folderList;
export const selectCurrentFolder = (state: RootState): Folder | null =>
  state.folderSlice.currentFolder;
export default FolderSlice.reducer;
