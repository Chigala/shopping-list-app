import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: builder => ({
    getProfile: builder.query({
      query: () =>{
        return { url: `/profile`, credentials: "include" };
      }
    }),
    logoutUser: builder.query({
      query: () =>{
        return { url: `/logout`, credentials: "include" };
      }
    }),
    registerUser: builder.mutation({
      query: user => ({
        url: '/register',
        method: 'POST',
        body: user
      })
    }),
    loginUser: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user,
        credentials: "include"
      })
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: '/change-password',
        method: 'POST',
        body: data,
        
      })
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
        
      })
    }),
    googleLogin: builder.query({
      query: () =>{
        return { url: `/get-google-profile`, credentials: "include" };
      }
    }),

    googleLogout: builder.query({
      query: () =>{
        return { url: `/google/logout`, credentials: "include" };
      }
    }),
  })
})

export const {
  useGetProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGoogleLoginQuery,
  useGoogleLogoutQuery
} = userApi
