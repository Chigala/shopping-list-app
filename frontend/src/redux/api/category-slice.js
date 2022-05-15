import { userApi } from './user-slice'

export const categoryApi = userApi.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: (id) =>{
          return {
              url: `/category/${id}`, 
          }
      }
    }),
    createCategory: builder.mutation({
      query: (name, id) => ({
        url: '/category/',
        method: 'POST',
        body: name,
        params: id,
      })
    })
  })
})
export const { useCreateCategoryMutation,useGetCategoryQuery } = categoryApi
