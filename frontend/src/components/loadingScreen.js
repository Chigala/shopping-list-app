import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { updateSnackbar } from '../redux/snackbar'
import { setCredentials } from '../redux/component-slice'
import { useGoogleLoginMutation } from '../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import React from 'react'

export const LoadingScreen = () => {
const dispatch = useDispatch(); 
const [googleLogin] = useGoogleLoginMutation()
  useEffect(() => {
    const handleAuthGoogleLogin = async () => {
      const response = await googleLogin()
      
      const dataValue = response.data
      console.log('this is the data value:', dataValue)
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
      }
      // dispatch(updateAuth(data.user))
      // dispatch(updateIsloggedIn(data.isLoggedIn))
      // localStorage.setItem('auth', JSON.stringify(data.user))
      // localStorage.setItem('isLoggedIn', data.isLoggedIn)
    }
    handleAuthGoogleLogin()
  }, [])
  return (
    <div className='flex justify-center'><CircularProgress/></div>
  )
}
