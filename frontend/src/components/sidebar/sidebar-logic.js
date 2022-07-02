import { useGoogleLogoutMutation } from '../../redux/api/user-slice'
import { logOut } from '../../redux/component-slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateSnackbar } from '../../redux/snackbar'

// import axios from "axios"

export const useSideBarLogic = () => {
  const [logout] = useGoogleLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
      await logout()
    console.log('logout was successful')
    dispatch(logOut())
        dispatch(
          updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'success',
            snackbarText: 'logged out successful',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        )
  }

  return {
    handleLogout
  }
}
