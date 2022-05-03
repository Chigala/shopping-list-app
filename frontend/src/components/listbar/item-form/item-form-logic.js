import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeSidebarScreen } from '../../../redux/component-slice'
export const useFormLogic = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const handleChangeScreen = () => {
    const data = 'items';
    (!window.matchMedia("(max-width: 767px)").matches)?dispatch(changeSidebarScreen(data)):navigate("/item")
  }
  return {
    handleChangeScreen
  }
}
