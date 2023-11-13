import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BaseUser } from '../../@types/entities/BaseUser';
import { Message } from '../../@types/entities/Message';
import authApi from '../../api/auth';
import { ROLE } from '../../@types/entities/Role';


type AuthState = {
  isAuthorized: boolean;
  currentUser?: BaseUser;
  currentFranchisor?: number;
  currentFranchisee?: number;
  currentEmployee?: number;
  currentWorkspace?: number;
  currentPage?: string;
  usersList?: BaseUser[];
  messages?: Message[];
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    messages: <Message[]>[]
  } as AuthState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.isAuthorized = false;
    },
    setCurretPage: (state, action) => {
      state.currentPage = action.payload
    },
    addMessage: (state, action) => {
      state.messages?.push(action.payload)
    },
    setCurrentFranchisor: (state, action) => {
      state.currentFranchisor = action.payload
    },
    setCurrentFranchisee: (state, action) => {
      state.currentFranchisee = action.payload
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload
    },
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          localStorage.setItem('token', payload.accessToken);
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        authApi.endpoints.currentUser.matchFulfilled,
        (state, { payload }) => {
          state.currentUser = payload;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        authApi.endpoints.currentUser.matchRejected,
        (state, action) => {
          if (action.error.name === 'ConditionError') return;
          localStorage.removeItem('token');
          state.isAuthorized = false;
        },
      )
      .addMatcher(
        authApi.endpoints.allUsers.matchFulfilled,
        (state, action) => {
          state.usersList = action.payload;
        },
      )
  },
});

export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;
export const selectCurrentUser = (
  state: RootState,
): BaseUser | undefined => state.authSlice.currentUser;
export const selectCurrentRole = (state: RootState): ROLE | undefined => state.authSlice.currentUser?.role;
export const selectCurrentFranchisor = (state: RootState): number | undefined =>
  state.authSlice.currentFranchisor;
export const selectCurrentWorkspace = (state: RootState): number | undefined =>
  state.authSlice.currentWorkspace;
export const selectCurrentFranchisee = (state: RootState): number | undefined =>
  state.authSlice.currentFranchisee;
export const selectCurrentEmployee = (state: RootState): number | undefined =>
  state.authSlice.currentEmployee;
export const selectCurrentPage = (state: RootState): string | undefined =>
  state.authSlice.currentPage;
export const selectUsersList = (state: RootState): BaseUser[] | undefined =>
  state.authSlice.usersList;
export const selectMessage = (state: RootState): Message[] =>
  state.authSlice.messages ?? [];

export const { logout, addMessage, setCurretPage, setCurrentFranchisor, setCurrentFranchisee, setCurrentEmployee, setCurrentWorkspace } = slice.actions;

export default slice.reducer;
