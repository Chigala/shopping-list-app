import { useSelector, useDispatch } from 'react-redux'
import {
  changeSidebarScreen,
  sendDataToItem
} from '../../redux/component-slice'
import { useAddProductToListMutation } from '../../redux/api/list-slice'
export const useHomepageLogic = () => {
  const dispatch = useDispatch()
  const [sendProduct] = useAddProductToListMutation()
  const listData = useSelector(state => state.componentSlice.listData)
  const listId = listData?._id

  const handleSendDataToItemPage = data => {
    dispatch(sendDataToItem(data))
    dispatch(changeSidebarScreen('items'))
  }
  const sendProductToList = async productId => {
    console.log(`this is the new productID: ${productId}`)
    console.log('the send to product is working ')
    const sentProduct = await sendProduct({ listId, productId })
    console.log(sentProduct.data)
  }

  return {
    handleSendDataToItemPage,
    sendProductToList
  }
}
