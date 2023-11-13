import { baseApi } from './base-api';
import { File } from '../@types/entities/File';
import { GetAllFolderDto } from '../@types/dto/folder/get-all.dto';

const fileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    allFile: builder.mutation<File[], GetAllFolderDto>({
      query: dto => ({
        url: `/files/${dto.spacework_id}`,
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
        providesTags: ['Folder'],
      }),
    }),
    createFile: builder.mutation<void, File>({
      query: dto => ({
          url: '/files',
          body: dto,
          method: 'POST',
      }),
  }),
  }),
});

export const {
  useAllFileMutation,
  useCreateFileMutation
} = fileApi;

export default fileApi;
