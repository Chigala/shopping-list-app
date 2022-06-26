import { useLoginUserMutation } from '../../redux/api/user-slice'
import {
  useGetProfileMutation,
  useCheckGoogleEmailMutation
} from '../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import {
  updateIsloggedIn,
  updateAuth,
  setCredentials
} from '../../redux/component-slice'
import { updateSnackbar } from '../../redux/snackbar'

export const useHandleLogin = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [
    checkGoogleEmail,
    { isLoading: checkEmailLoading }
  ] = useCheckGoogleEmailMutation()
  const [getProfile] = useGetProfileMutation()
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const dispatch = useDispatch()
  const loginBlur = async data => {
    // console.log('this is the data after the login blur: ', data.target.value)
    const value = { email: data.target.value }
    console.log(value)
    await checkGoogleEmail(value)
  }
  // const changeState = async () => {
  //   const userData = await getProfile()
  //   const data = userData.data
  //   console.log('this is the data from the secure login route: ', data)
  //   // dispatch(updateAuth(data.user))
  //   // dispatch(updateIsloggedIn(data.isLoggedIn))
  //   // localStorage.setItem('auth', JSON.stringify(data.user))
  //   // localStorage.setItem('isLoggedIn', data.isLoggedIn)
  // }

  const handleLogin = async data => {
    try {
      console.log('the button was pressed')
      console.log(data)
      const result = await loginUser(data)
      const value = result?.error?.originalStatus
      const dataValue = result.data
      console.log('this is the value that is gotten from login:', dataValue)
      if (value === 404) {
        dispatch(
          updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'warning',
            snackbarText: 'user not found!',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        )
      }
      if (value === 401) {
        dispatch(
          updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'warning',
            snackbarText: 'Incorrect username and password!',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        )
      }
      if (dataValue) {
        dispatch(
          updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'success',
            snackbarText: 'Logged in successful',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        )
        dispatch(setCredentials(dataValue))
        // changeState()
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
