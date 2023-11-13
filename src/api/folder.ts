import { baseApi } from './base-api';
import { Folder } from '../@types/entities/Folder';
import { GetAllFolderDto } from '../@types/dto/folder/get-all.dto';

const folderApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    allFolders: builder.mutation<Folder[], GetAllFolderDto>({
      query: dto => ({
        url: `/folder/${dto.spacework_id}`,
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
        providesTags: ['Folder'],
      }),
    }),
    createFolder: builder.mutation<void, Folder>({
      query: dto => ({
          url: '/folder',
          body: dto,
          method: 'POST',
      }),
  }),
  }),
});

export const {
  useAllFoldersMutation,
  useCreateFolderMutation
} = folderApi;

export default folderApi;
