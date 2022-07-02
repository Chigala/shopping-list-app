import { CircularProgress } from '@mui/material'
import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { updateSnackbar } from '../redux/snackbar'
import { setCredentials } from '../redux/component-slice'
import { useGoogleLoginMutation } from '../redux/api/user-slice'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

export const LoadingScreen = () => {
  // const dispatch = useDispatch();
  // const [googleLogin] = useGoogleLoginMutation()
  const location = useLocation()
  const token = useSelector(state => state.componentSlice.token)
  return !token ? (
    <div className='flex items-center justify-center'>
      <CircularProgress />
    </div>
  ) : (
    <Navigate to='/homepage' state={{ from: location }} replace />
  )
}
