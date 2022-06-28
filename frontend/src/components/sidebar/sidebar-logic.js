import { useGoogleLogoutMutation } from '../../redux/api/user-slice'
import { updateIsloggedIn } from '../../redux/component-slice'
import { useDispatch } from 'react-redux'
import axios from "axios"

export const useSideBarLogic = () => {
  const [logout] = useGoogleLogoutMutation()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const result = await axios.get('http://localhost:5000/api/refresh', { withCredentials: true })
    console.log("this is the refresh result:",result.data)
    // const response = await logout()
    // console.log("this is the response from the logout", response.data); 
    // console.log('logout was successful')
    // localStorage.setItem("auth", false)
    // dispatch(updateIsloggedIn(false))
    // localStorage.removeItem('auth')
    // window.location.reload()
  }

  return {
    handleLogout
  }
}
