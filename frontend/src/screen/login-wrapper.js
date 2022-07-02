import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

export const LoginWrapper = () => {
  const lastPagePathname = localStorage.getItem('location')
  const user = useSelector(state => state.componentSlice.token)
  // console.log("this is the login wrapper user", user)
  const location = useLocation()
  return !user ? (
    <>
      <Outlet />
    </>
  ) : (
    // <Navigate state={{ from: location }} replace to={'/homepage' }  />
    <Navigate to={{ pathname: lastPagePathname || "/homepage", state: { prevPath: location.pathname } }} />
  )
}
