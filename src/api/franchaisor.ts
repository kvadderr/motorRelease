import { baseApi } from './base-api';
import { Franchaisor } from '../@types/entities/Franchaisor';

const franchisorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    allFranchaisor: builder.query<Franchaisor[], void>({
      query: () => ({
        url: '/franchisor',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
      providesTags: ['Franchaisor'],
    }),
    getMeAtFranchaisor: builder.query<Franchaisor, void>({
      query: () => ({
        url: '/franchisor/me',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
    }),
  }),
  
});

export const {
  useAllFranchaisorQuery,
  useGetMeAtFranchaisorQuery
} = franchisorApi;

export default franchisorApi;
