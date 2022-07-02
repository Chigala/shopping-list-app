
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
    getHistoryList: builder.query({
      query: id => {
        return {
          url: `/list/get-all/${id}`
        }
      },
    }),
    getCategoryFrequency: builder.mutation({
      query: id => {
        return {
          url: `/list-category-statistics-data/${id}`
        }
      },
    }),
    getProductFrequency: builder.mutation({
      query: id => {
        return {
          url: `/list-statistics-data/${id}`
        }
      },
    }),
    getListName: builder.query({
      query: id => {
        return {
          url: `/list-data/${id}`
        }
      },
      providesTags: ['unpopulatedList']
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
      invalidatesTags: ['unpopulatedList' ]
    }),
    cancelTheList : builder.mutation({
      query: ( {userId,listId} ) => {
        return {
          url: `/list/cancel/${userId}/${listId}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['List','unpopulatedList']
    }),
    completeList : builder.mutation({
      query: ({  userId,listId  }) => {
        return {
          url: `/list/complete/${userId}/${listId}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['List','unpopulatedList']
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
useGetListNameQuery,
useGetHistoryListQuery,
useGetCategoryFrequencyMutation,
useGetProductFrequencyMutation
} = listApi
