import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ModalState = {
  showAdminMode: boolean;
  showModal: boolean;
  showModalFranchiseeInvite: boolean;
};

const initialState: ModalState = {
  showAdminMode: false,
  showModal: false,
  showModalFranchiseeInvite: false,
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setShowModalFranchiseeInvite: (state, action) => {
      state.showModalFranchiseeInvite = action.payload;
    },
    setShowAdminMode: (state, action) => {
      state.showAdminMode = action.payload
    }
  },
  extraReducers: {}
});

export const { setShowModal, setShowModalFranchiseeInvite, setShowAdminMode } = ModalSlice.actions;
export const selectShowModal = (state: RootState): boolean =>
  state.modalSlice.showModal;
export const selectShowAdminMode = (state: RootState): boolean =>
  state.modalSlice.showAdminMode;
export const selectShowModalFranchiseeInvite = (state: RootState): boolean =>
  state.modalSlice.showModalFranchiseeInvite;
export default ModalSlice.reducer;
