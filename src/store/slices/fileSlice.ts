import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fileApi from '../../api/file';
import { File } from '../../@types/entities/File';

type FileState = {
  fileList: File[];
};

const initialState: FileState = {
  fileList: [],
};

const FileSlice = createSlice({
  name: 'file',
  initialState,

  reducers: {
    addFile: (state, action) => {
      state.fileList.push(action.payload);
    },
    changeFileName: (state, action) => {
      const { id, newName } = action.payload;
      const fileToUpdate = state.fileList.find(file => file.id === id);
      if (fileToUpdate) {
        fileToUpdate.name = newName;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        fileApi.endpoints.allFile.matchFulfilled,
        (state, { payload }) => {
          state.fileList = payload
        },
      )
  }
});

export const { addFile, changeFileName } = FileSlice.actions;
export const selectFileList = (state: RootState): File[] | null =>
  state.fileSlice.fileList;


export default FileSlice.reducer;
