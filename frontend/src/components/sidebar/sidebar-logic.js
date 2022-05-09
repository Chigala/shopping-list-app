import { useDispatch } from "react-redux";
import { useLogoutUserQuery } from "../../redux/api/user-slice";
import { updateAuth } from "../../redux/component-slice";
import { useGoogleLogoutQuery } from "../../redux/api/user-slice";

export const useSideBarLogic = () => {
const {data:logoutData} = useGoogleLogoutQuery();  
  const {data} = useLogoutUserQuery(); 
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("the logout button is working")
    console.log(data.isLoggedIn)
    dispatch(updateAuth(data.isLoggedIn))
    // handleGoogleLogout(); 
    localStorage.setItem("auth", data.isLoggedIn); 
  }

  return {
      handleLogout
  }
}