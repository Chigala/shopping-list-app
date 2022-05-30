
import { userApi } from './user-slice'

export const listApi = userApi.injectEndpoints({
  endpoints: builder => ({
    getList: builder.query({
      query: id => {
        return {
          url: `/list/${id}`
        }
      },
      providesTags: ['List']
    }),
    createList : builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/list/${id}`,
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['Category', 'Product']
    }),
    updateList: builder.mutation({
      query: ({ formData, productId }) => {
        return {
          url: `/list/${productId}`,
          method: 'PUT',
          body: formData
        }
      },
      invalidatesTags: ['Category', 'Product']
    }),
    deleteList : builder.mutation({
      query: ({ categoryId, productId }) => {
        return {
          url: `/list/${productId}/${categoryId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Category', 'Product']
    })
  })
})
export const {
useGetListQuery,
useDeleteListMutation,
useCreateListMutation,
useUpdateListMutation, 
} = listApi
