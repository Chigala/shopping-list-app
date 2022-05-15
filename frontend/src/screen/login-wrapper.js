import React from 'react'
import { Outlet,Navigate } from 'react-router'

export const LoginWrapper = ({user}) => {
  console.log(`this is the logout user:  ${user}`)
  return (
    
   !user? 
    <>
    <Outlet/>
    </>: 
    <Navigate to="/homepage"/>
  )
}
