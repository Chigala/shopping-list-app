import { useDispatch } from 'react-redux'
import { useLogoutUserQuery } from '../../redux/api/user-slice'
import { updateAuth } from '../../redux/component-slice'
import { useGoogleLogoutQuery } from '../../redux/api/user-slice'
import { useNavigate } from 'react-router'

export const useSideBarLogic = () => {
   const navigate = useNavigate(); 
    const {isSuccess, data} = useGoogleLogoutQuery()  
  const handleLogout = () => {
  if(isSuccess){
    console.log("logout was successful")
    window.location.reload()
    // navigate("/", { replace: true }); 
    localStorage.setItem("auth", false)
  }
  }

  return {
    handleLogout
  }
}
