
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: builder => ({
    getCategory: builder.query({
      query: () =>{
        return { url: `/profile`, credentials: "include" };
      }
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: '/change-password',
        method: 'POST',
        body: data,
        
      })
    }),
  })
})

export const {
} = categoryApi
