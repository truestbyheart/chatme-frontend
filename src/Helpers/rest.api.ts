import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignupInputs } from '../Pages/Signup';
import { LoginInputs } from '../Pages/Login/Login';

export type SignupHTTPResponse = {
  status: number;
  message?: string;
  username?: string;
  token?: string;
};

export const chatmeApi = createApi({
  reducerPath: 'chatmeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    postSignup: builder.mutation<SignupInputs, Partial<SignupInputs>>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    postLogin: builder.mutation<LoginInputs, Partial<LoginInputs>>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const { usePostSignupMutation, usePostLoginMutation } = chatmeApi;
