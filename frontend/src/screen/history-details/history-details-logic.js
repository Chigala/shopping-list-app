import { useNavigate } from 'react-router-dom'
export const useHistoryDetailsLogic = () => {
  const navigate = useNavigate()
  const handleChangeScreen = () => {
    navigate('/history')
  }
  return {
    handleChangeScreen
  }
}
