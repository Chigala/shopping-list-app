import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/sidebar/sidebar'

export const CartWrapper = () => {
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const location = useLocation()

  return isWeb ? (
      <div className='flex'>
        <div className=' w-fit bg-#FFFFFF'>
          <Sidebar />
        </div>
        <div className='flex-1 overflow-x-hidden'>
          <Outlet />
        </div>
      </div>
  ) : (
    <Navigate to='/homepage ' state={{ from: location }} replace />
  )
}
