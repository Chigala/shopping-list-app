
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
    getListName: builder.query({
      query: id => {
        return {
          url: `/list-data/${id}`
        }
      },
    }),
    addProductToList : builder.mutation({
      query: ({listId,productId}) => {
        return {
          url: `/list/${listId}/${productId}`,
          method: 'POST',
        }
      },
      invalidatesTags: ['List']
    }),
    updateListName: builder.mutation({
      query: ({ formData, listId }) => {
        return {
          url: `/list/${listId}`,
          method: 'PUT',
          body: formData
        }
      },
      invalidatesTags: ['List' ]
    }),
    cancelTheList : builder.mutation({
      query: (listId) => {
        return {
          url: `/list/cancel/${listId}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['List']
    }),
    completeList : builder.mutation({
      query: (listId) => {
        return {
          url: `/list/complete/${listId}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['List']
    }),
    deleteProductFromList : builder.mutation({
      query: ({listId, value}) => {
        return {
          url: `/list/remove-product/${listId}/${value}`,
          method: 'PUT',
        }
      },
      // invalidatesTags: ['List']
    }),
  })
})
export const {
useGetListQuery,
useCancelTheListMutation,
useCompleteListMutation,
useDeleteProductFromListMutation,
useUpdateListNameMutation,
useAddProductToListMutation,
useGetListNameQuery
} = listApi
