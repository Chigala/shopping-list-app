import { useLoginUserMutation } from '../../redux/api/user-slice'
import { useGetProfileMutation,useCheckGoogleEmailMutation } from '../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import { updateIsloggedIn, updateAuth } from '../../redux/component-slice'
import { updateSnackbar } from '../../redux/snackbar'

export const useHandleLogin = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [checkGoogleEmail, {isLoading:checkEmailLoading}] = useCheckGoogleEmailMutation(); 
  const [getProfile] = useGetProfileMutation()
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const dispatch = useDispatch()
  const loginBlur = async data => {
    // console.log('this is the data after the login blur: ', data.target.value)
    const value = {email: data.target.value}; 
    console.log(value); 
   await checkGoogleEmail(value);  
  }

  const handleLogin = async data => {
    try {
      console.log('the button was pressed')
      const result = await loginUser(data)
      const value = result.data
      dispatch(
        isWeb
          ? updateSnackbar({
              snackbarOpen: true,
              snackbarType: value.color,
              snackbarText: value.msg,
              snackbarVertical: 'top',
              snackbarHorizontal: 'center'
            })
          : updateSnackbar({
              snackbarOpen: true,
              snackbarType: value.color,
              snackbarText: value.msg,
              snackbarVertical: 'top',
              snackbarHorizontal: 'center'
            })
      )

      if (result.data.loggedIn) {
        const changeState = async () => {
          const userData = await getProfile()
          const data = userData.data
          dispatch(updateAuth(data.user))
          dispatch(updateIsloggedIn(data.isLoggedIn))
          localStorage.setItem('auth', JSON.stringify(data.user))
          localStorage.setItem('isLoggedIn', data.isLoggedIn)
        }
        changeState()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    handleLogin,
    isLoading,
    loginBlur, 
    checkEmailLoading
  }
}
