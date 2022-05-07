import { useDispatch } from 'react-redux'
import { useForgotPasswordMutation } from '../../redux/api/user-slice'
import { updateSnackbar } from '../../redux/snackbar'

export const useForgotPasswordLogic = () => {
  const dispatch = useDispatch()
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const [
    sendEmail,
    { isLoading, isSuccess, isError }
  ] = useForgotPasswordMutation()

  const handleCreate = data => {
    handleEmail(data)
  }
  const handleEmail = async data => {
    const response = await sendEmail(data)
    if(isSuccess){
      
    displaySuccessMsg()
    }else{
      displayFailureMsg();
    }
    console.log(response.data)
  }
  const displaySuccessMsg = () => {
    console.log('display message is working ')
    dispatch(
      isWeb
        ? updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'success',
            snackbarText: 'An email has been sent to you',
            snackbarVertical: 'bottom',
            snackbarHorizontal: 'left'
          })
        : updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'success',
            snackbarText: 'An email has been sent to you',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
    )
  }
  const displayFailureMsg = () => {

    dispatch(
      isWeb
        ? updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarText: 'Email not found in our database',
            snackbarVertical: 'bottom',
            snackbarHorizontal: 'left'
          })
        : updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarText: 'Email not found in our database',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
    )
  }
  return {
    handleCreate,
    isLoading,
    isSuccess,
    isError
  }
}
