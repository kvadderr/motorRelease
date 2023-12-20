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
    },
    changeFolderName: (state, action) => {
      const { id, newName } = action.payload;
      const folderToUpdate = state.folderList.find(folder => folder.id === id);
      if (folderToUpdate) {
        folderToUpdate.name = newName;
      }
    },
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

export const { addFolder, setCurrentFolder, changeFolderName } = FolderSlice.actions;
export const selectFolderList = (state: RootState): Folder[] | null =>
  state.folderSlice.folderList;
export const selectCurrentFolder = (state: RootState): Folder | null =>
  state.folderSlice.currentFolder;
export default FolderSlice.reducer;
