import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

export const LoginWrapper = () => {
  const user = useSelector(state => state.componentSlice.isLoggedIn)
  console.log("this is the login wrapper user", user)
  const location = useLocation()
  return !user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate state={{ from: location }} replace to={'/homepage' }  />
  )
}
