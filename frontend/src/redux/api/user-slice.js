import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Product', 'List', 'category'],
  endpoints: builder => ({
    getProfile: builder.mutation({
      query: () => ({ url: `/profile`, credentials: 'include', method: "GET" })
    }),
    logoutUser: builder.query({
      query: () => {
        return { url: `/logout`, credentials: 'include' }
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
        credentials: 'include'
      })
    }),
    checkGoogleEmail: builder.mutation({
      query: user => ({
        url: '/check-password',
        method: 'POST',
        body: user,
        credentials: 'include'
      })
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: '/change-password',
        method: 'POST',
        body: data
      })
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: '/forgot-password',
        method: 'POST',
        body: data
      })
    }),
    googleLogin: builder.mutation({
      query: () => ({
        url: `/get-google-profile`,
        method: 'GET',
        credentials: 'include'
      })
    }),

    googleLogout: builder.mutation({
      query: () => ({
        url: `/google/logout`,
        method: 'GET',
        credentials: 'include'
      })
    })
  })
})

export const {
  useGetProfileMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGoogleLoginMutation,
  useGoogleLogoutMutation,
  useCheckGoogleEmailMutation
} = userApi
