import { combineReducers } from 'redux';

import authApi from '../api/auth';
import workspaceApi from '../api/workspace';
import franchiseeApi from '../api/franchaisee';
import franchisorApi from '../api/franchaisor';
import folderApi from '../api/folder';
import fileApi from '../api/file';
import groupApi from '../api/group';

import authSlice from './slices/authSlice';
import modalSlice from './slices/modalSlice';
import workspaceSlice from './slices/workspaceSlice';
import franchiseeSlice from './slices/franchiseeSlice';
import franchisorSlice from './slices/franchisorSlice';
import folderSlice from './slices/folderSlice';
import fileSlice from './slices/fileSlice';
import groupSlice from './slices/groupSlice';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  [franchiseeApi.reducerPath]: franchiseeApi.reducer,
  [franchisorApi.reducerPath]: franchisorApi.reducer,
  [folderApi.reducerPath]: folderApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [groupApi.reducerPath]: groupApi.reducer,

  authSlice: authSlice,
  modalSlice: modalSlice,
  workspaceSlice: workspaceSlice,
  franchiseeSlice: franchiseeSlice,
  franchisorSlice: franchisorSlice,
  folderSlice: folderSlice,
  fileSlice: fileSlice,
  groupSlice: groupSlice
});
