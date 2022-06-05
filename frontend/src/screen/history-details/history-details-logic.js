import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetHistoryListQuery } from '../../redux/api/list-slice'

export const useHistoryDetailsLogic = () => {
  const id = useSelector(state => state.componentSlice.listHistoryId)
  const user = useSelector(state => state.componentSlice.isAuth)
  const userId = user._id; 
  const { data } = useGetHistoryListQuery(userId)
  
  console.log("this is the use history details data", data)
  const filteredData = data.filter(element => element.id  === id)[0]
  const navigate = useNavigate()
  const handleChangeScreen = () => {
    navigate('/history')
  }
  return {
    handleChangeScreen,
    filteredData
  }
}
