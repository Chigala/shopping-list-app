import { userApi } from './user-slice'

export const productApi = userApi.injectEndpoints({
  endpoints: builder => ({
    getProduct: builder.query({
      query: id => {
        return {
          url: `/product/${id}`
        }
      },
      providesTags: ['Product']
    }),
    createProduct: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/product/${id}`,
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['Category', 'Product']
    }),
    updateProduct: builder.mutation({
      query: ({ formData, productId }) => {
        return {
          url: `/product/${productId}`,
          method: 'PUT',
          body: formData
        }
      },
      invalidatesTags: ['Category', 'Product']
    }),
    deleteProduct : builder.mutation({
      query: ({ categoryId, productId }) => {
        return {
          url: `/product/${productId}/${categoryId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Category', 'Product']
    })
  })
})
export const {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
