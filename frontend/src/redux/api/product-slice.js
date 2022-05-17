
import { userApi } from './user-slice'

export const productApi = userApi.injectEndpoints({
  endpoints: builder => ({
    getProduct: builder.query({
      query: (id) =>{
          return {
              url: `/product/${id}`, 
          }
      }
    }),
    createProduct: builder.mutation({
      query: (name, id) => ({
        url: '/product/',
        method: 'POST',
        body: name,
        params: id,
      })
    })
  })
})
export const { useCreateCategoryMutation,useGetCategoryQuery } = productApi
