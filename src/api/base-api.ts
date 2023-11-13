import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../http/baseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'CurrentUser',
    'Franchaisor',
    'Franchaisee',
    'Folder',
    'Spacework',
    'Group',
    'Users'
  ],
  endpoints: () => ({}),
});
