import { baseApi } from './base-api';
import { Franchisee } from '../@types/entities/Franchaisee';

const franchiseeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    allFranchaisee: builder.query<Franchisee[], void>({
      query: () => ({
        url: '/franchisee',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
      providesTags: ['Franchaisee'],
    }),
    getMeAtFranchisee: builder.query<Franchisee, void>({
      query: () => ({
        url: '/franchisee/me',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
    }),
  }),
});

export const {
  useAllFranchaiseeQuery,
  useGetMeAtFranchiseeQuery 
} = franchiseeApi;

export default franchiseeApi;
