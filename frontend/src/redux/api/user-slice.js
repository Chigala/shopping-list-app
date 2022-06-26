import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../component-slice'

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().componentSlice.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token')
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    console.log(refreshResult)
    if (refreshResult?.data) {
      const user = api.getState().componentSlice.user
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'List', 'category'],
  endpoints: builder => ({
    getProfile: builder.mutation({
      query: () => ({ url: `/profile`, credentials: 'include', method: 'GET' })
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
