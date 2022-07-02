import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../component-slice'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  // baseUrl: 'http://localhost:5000/api',

  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    console.log('this is the endpoint:', endpoint)
    const token = getState().componentSlice.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

//for future you, note I used mutex here for no exact reason you can use the normal reauthorization method that is in the documentation, also it doesn't matter if you don't destructure the api field that is calling the refresh endpoint in the baseQuerywithreauth
const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token')
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // send refresh token to get new access token
      try {
        const refreshResult = await baseQuery(
          '/refresh',
          { ...api, endpoint: 'refresh' },
          extraOptions
        )
        console.log(refreshResult)
        if (refreshResult?.data) {
          console.log('there is a refreshed result data')
          const user = api.getState().componentSlice.user
          // store the new token
          api.dispatch(setCredentials({ ...refreshResult.data, user }))
          // retry the original query with new access token
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
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
    refreshToken: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET',
        credentials: 'include'
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
  useCheckGoogleEmailMutation,
  useRefreshTokenMutation
} = userApi
