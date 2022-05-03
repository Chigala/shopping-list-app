import { useDispatch } from 'react-redux'
import { changeSidebarScreen } from '../../../redux/component-slice'
export const useItemLogic = () => {
  const dispatch = useDispatch()
  const handleBack = () => {
    const data = 'item-form'
    dispatch(changeSidebarScreen(data))
  }
  const handleAddToList = () => {
    const data = 'default'
    dispatch(changeSidebarScreen(data))
  }
  return {
    handleBack,
    handleAddToList
  }
}
