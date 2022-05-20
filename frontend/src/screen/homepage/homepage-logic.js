import { useSelector, useDispatch } from 'react-redux'
import { changeSidebarScreen, sendDataToItem } from '../../redux/component-slice'

export const useHomepageLogic = () => {
    const dispatch = useDispatch(); 

  const handleSendDataToItemPage = (data) => {
      
     dispatch(sendDataToItem(data))
     dispatch(changeSidebarScreen("items"))
  }
  return {
    handleSendDataToItemPage
  }
}
