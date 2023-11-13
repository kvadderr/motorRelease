import { baseApi } from './base-api';
import { SignInResponse } from '../@types/api/response';
import { SignInDto } from '../@types/dto/auth/signin.dto';
import { SignUpDto } from '../@types/dto/auth/signup.dto';
import { BaseUser } from '../@types/entities/BaseUser';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInDto>({
      query: payload => ({
        url: '/auth/login',
        body: payload,
        method: 'POST',
      }),
    }),
    signUp: builder.mutation<{ accessToken: string; }, SignUpDto>({
      query: dto => ({
        url: '/auth/register',
        body: dto,
        method: 'POST',
      }),
    }),
    currentUser: builder.query<BaseUser, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
      providesTags: ['CurrentUser'],
    }),
    allUsers: builder.query<BaseUser[], void>({
      query: () => ({
        url: '/user',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
      providesTags: ['Users'],
    }),
  })
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useCurrentUserQuery,
  useAllUsersQuery
} = authApi

export default authApi