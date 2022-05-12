import { useDispatch } from 'react-redux'
import { useLogoutUserQuery } from '../../redux/api/user-slice'
import { updateAuth } from '../../redux/component-slice'
import { useGoogleLogoutQuery } from '../../redux/api/user-slice'
import { useNavigate } from 'react-router'

export const useSideBarLogic = () => {
   const navigate = useNavigate(); 
    const {isSuccess, data} = useGoogleLogoutQuery()  
  const handleLogout = () => {
    console.log('the logout button is working')
  if(isSuccess){
    console.log(data); 
    console.log("logout was successful")
    localStorage.setItem("auth", false)
    navigate("/", { replace: true }); 
  }
  }

  return {
    handleLogout
  }
}
