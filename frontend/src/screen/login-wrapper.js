import React from 'react'
import { Outlet,Navigate } from 'react-router'
import { useSelector } from 'react-redux'

export const LoginWrapper = () => {
  const user = useSelector(state => state.componentSlice.isAuth)
  
  console.log(`this is the logout user:  ${user}`)
  return (
    
   !user? 
    <>
    <Outlet/>
    </>: 
    <Navigate to="/homepage"/>
  )
}
