import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  useGetCategoryFrequencyMutation,
  useGetProductFrequencyMutation
} from '../../../redux/api/list-slice'
export const useDashboardLogic = () => {
  const [getCategoryFrequency] = useGetCategoryFrequencyMutation()
  const [getProductFrequency] = useGetProductFrequencyMutation()
  const [product, setProduct] = useState("")
  const [category, setCategory] = useState("")

  const user = useSelector(state => state.componentSlice.isAuth)
  const id = user._id
  useEffect(() => {
    Promise.all([getCategoryFrequency(id), getProductFrequency(id)]).then(
      ([category, product]) => {
        setCategory(category.data); 
        setProduct(product.data); 

      }
    )
  }, [])

  return {
      product,
      category
  }
}
