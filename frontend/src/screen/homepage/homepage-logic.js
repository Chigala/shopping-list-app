import { useSelector, useDispatch } from 'react-redux'
import {
  changeSidebarScreen,
  sendDataToItem
} from '../../redux/component-slice'
import { useAddProductToListMutation } from '../../redux/api/list-slice'
import { updateSnackbar } from '../../redux/snackbar'

export const useHomepageLogic = () => {
  const dispatch = useDispatch()
  const [sendProduct] = useAddProductToListMutation()
  const listId = useSelector(state => state.componentSlice.listId)

  const handleSendDataToItemPage = data => {
    dispatch(sendDataToItem(data))
    dispatch(changeSidebarScreen('items'))
  }
  const sendProductToList = async productId => {
    console.log(`this is the new productID: ${productId}`)
    console.log('the send to product is working ')
    const sentProduct = await sendProduct({ listId, productId })
    const result = sentProduct.data; 
    console.log("this is the sendProductToList:",result)
    console.log(result.color)
        dispatch(
          updateSnackbar({
            snackbarOpen: true,
            snackbarType: result.color,
            snackbarText: result.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        )
  }

  return {
    handleSendDataToItemPage,
    sendProductToList
  }
}
