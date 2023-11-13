import { baseApi } from './base-api';
import { Group } from '../@types/entities/Group';
import { GetAllWorkSpaceDto } from '../@types/dto/workspace/get-all.dto';

const groupApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    allGroups: builder.mutation<Group[], GetAllWorkSpaceDto>({
      query: dto => ({
        url: `/group/${dto.user_id}`,
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
        providesTags: ['Group'],
      }),
    }),
    createGroup: builder.mutation<void, Group>({
      query: dto => ({
          url: '/group',
          body: dto,
          method: 'POST',
      }),
  }),
  }),
});

export const {
  useAllGroupsMutation,
  useCreateGroupMutation
} = groupApi;

export default groupApi;
