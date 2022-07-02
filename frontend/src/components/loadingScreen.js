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
  return (
    <div className='flex justify-center'><CircularProgress/></div>
  )
}
