import React from 'react'
import { Outlet,Navigate } from 'react-router'

export const LoginWrapper = ({user}) => {
  return (
   !user? 
    <>
    <Outlet/>
    </>: 
    <Navigate to="/homepage"/>
  )
}
