import { useNavigate } from 'react-router-dom'
import { useGetHistoryListQuery } from '../../redux/api/list-slice'
import { useSelector, useDispatch } from 'react-redux'
import {getListHistoryId} from "../../redux/component-slice"
export const useHistoryLogic = () => {
  const user = useSelector(state => state.componentSlice.isAuth)
  const id = user._id
  const dispatch = useDispatch() 
  console.log("this is the userId:", id)
  const { data } = useGetHistoryListQuery(id)
  const navigate = useNavigate()
  const handleChangeScreen = () => {
    navigate('/history-details')
  }
  const handleDispatchId = (id) => {
      dispatch(getListHistoryId(id))
  }
  return {
    handleChangeScreen,
    data, 
    handleDispatchId
  }
}
