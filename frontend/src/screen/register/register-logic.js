import { useRegisterUserMutation } from '../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { updateSnackbar } from '../../redux/snackbar'

export const useHandleRegister = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const handleRegister = async ({ confirmPassword, ...others }) => {
    const response = await registerUser(others)
    const data = response.data
    dispatch(
      isWeb
        ? updateSnackbar({
            snackbarOpen: true,
            snackbarType: data.color,
            snackbarText: data.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        : updateSnackbar({
            snackbarOpen: true,
            snackbarType: data.color,
            snackbarText: data.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
    )
    setTimeout(() => {
    navigate('/login')
      
    }, 1000);
  }
  return {
    handleRegister, 
    isLoading
  }
}
