import { useDispatch, useSelector } from 'react-redux'
import { changeSidebarScreen } from '../../../redux/component-slice'
import { useFormLogic } from '../../listbar/item-form/item-form-logic'
import { useCreateProductMutation } from '../../../redux/api/product-slice'

export const useItemLogic = () => {
  const { handleChangeScreen } = useFormLogic()

  const [sendProduct] = useCreateProductMutation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.componentSlice.isAuth)
  const productId = useSelector(state => state.componentSlice.itemData._id)
  console.log(productId) 
  const id = user._id
  const handleBack = () => {
    const data = 'item-form'
    dispatch(changeSidebarScreen(data))
  }
  const handleAddToList = () => {
    const data = 'default'
    dispatch(changeSidebarScreen(data))
  }
  const handleSubmitItemForm = data => {
    handleChangeScreen()
    handleSendProduct(data)
  }

  const handleSendProduct = async data => {
    console.log('the product has been sent ')
    const formData = new FormData()
    formData.append('image', data.image[0])
    formData.append('name', data.name)
    formData.append('category', data.category)
    formData.append('description', data.description)
    
    await sendProduct({ formData, id })
  }
  return {
    handleBack,
    handleAddToList,
    handleSubmitItemForm
  }
}
