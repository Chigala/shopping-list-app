import { userApi } from './user-slice'

export const categoryApi = userApi.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: id => {
        return {
          url: `/category/${id}`
        }
      },
      providesTags: ['Category']
    }),
    createCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Category']
    })
  })
})
export const { useCreateCategoryMutation, useGetCategoryQuery } = categoryApi
