import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { changeSidebarScreen } from '../../../redux/component-slice'
import { useFormLogic } from '../../listbar/item-form/item-form-logic'
import { updateSnackbar } from '../../../redux/snackbar'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} from '../../../redux/api/product-slice'
import { useAddProductToListMutation } from '../../../redux/api/list-slice'

/*
TODO: 
- set the whole thing so that when you the dispatch has a product id it will automatically update
-crete a new update product mutation 
- refactor this whole file and then make it look cleaner
*/

export const useItemLogic = () => {
  const { handleChangeScreen } = useFormLogic()
  const [sendProductToList] = useAddProductToListMutation()
  const [openDialog, setOpenDialog] = useState(false)
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const navigate = useNavigate()

  const [sendProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.componentSlice.isAuth)
  const productData = useSelector(state => state.componentSlice.itemData)
  const productId = productData._id
  const listId = useSelector(state => state.componentSlice.listId)
  const categoryId = productData.category
  console.log(`this is the productID: ${productId}`)
  const id = user._id
  const handleBack = () => {
    const data = 'default'
    isWeb ? dispatch(changeSidebarScreen(data)) : navigate('/listbar')
  }
  const handleBackToItemForm = () => {
    const data = 'itemform'
    isWeb ? dispatch(changeSidebarScreen(data)) : navigate('/itemform')
  }
  const handleDialogOpen = () => {
    setOpenDialog(true)
  }
  const handleDialogClose = () => {
    setOpenDialog(false)
  }
  const handleAddToList = async () => {
    const data = 'default'
    const apiData = await sendProductToList({ listId, productId })
    const value = apiData.data
    dispatch(
      isWeb
        ? updateSnackbar({
            snackbarOpen: true,
            snackbarType: value.color,
            snackbarText: value.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        : updateSnackbar({
            snackbarOpen: true,
            snackbarType: value.color,
            snackbarText: value.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
    )

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
    if (productId) {
      console.log('it is updatting ')
      await updateProduct({ formData, productId })
    } else {
      console.log('it is creating a new product')
      await sendProduct({ formData, id })
    }
  }
  const handleDeleteProduct = async () => {
    console.log('the delete function is calling')
    await deleteProduct({ categoryId, productId })
    const data = 'default'
    dispatch(changeSidebarScreen(data))
  }
  return {
    handleBack,
    handleAddToList,
    handleSubmitItemForm,
    handleDeleteProduct,
    handleDialogClose,
    handleDialogOpen,
    openDialog,
    handleBackToItemForm
  }
}
