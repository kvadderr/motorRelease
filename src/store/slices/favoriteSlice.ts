import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fileApi from '../../api/file';
import { DataNode } from '../../@types/entities/TreeDataNode';

type FavoriteState = {
  favoriteList: DataNode[];
};

const initialState: FavoriteState = {
  favoriteList: [],
};

const FavoriteSlice = createSlice({
  name: 'favorite',
  initialState,

  reducers: {
    addFavorite: (state, action) => {
      state.favoriteList.push(action.payload);
    },
  }
});

export const { addFavorite } = FavoriteSlice.actions;
export const selectFavorite = (state: RootState): DataNode[] | null =>
  state.favoriteSlice.favoriteList;


export default FavoriteSlice.reducer;
