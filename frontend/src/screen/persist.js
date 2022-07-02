import React from 'react'
import { useEffect,useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useRefreshTokenMutation } from '../redux/api/user-slice'
import { setCredentials } from '../redux/component-slice'
import { CircularProgress } from '@mui/material'

export const PersistLogin = () => {
  const token = useSelector(state => state.componentSlice.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [getRefreshToken, { isLoading }] = useRefreshTokenMutation()
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("calling the api")
        const result = await getRefreshToken()
        console.log("this is the persistData:",result.data)
        const apiData = result.data;
        dispatch(setCredentials(apiData))
        if(result?.error?.originalStatus === 402){
            navigate("/")
        }
      } catch (err) {
        console.log(err)
      }
    }
     !token && verifyToken();  
    
  },[] )

  return <div>{isLoading ? <CircularProgress/>:<Outlet/>}</div>
}
