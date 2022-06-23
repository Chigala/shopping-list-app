import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export const CartWrapper = () => {
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const location = useLocation()

  return isWeb ? (
    <Outlet />
  ) : (
    <Navigate to='/homepage ' state={{ from: location }} replace />
  )
}
