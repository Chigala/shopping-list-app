import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/sidebar/sidebar'
import { useMobile } from '../helpers/react-responsive'

export const CartWrapper = () => {
  const mobile = useMobile()
  // const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const location = useLocation()

  return mobile ? (
      <div className='flex'>
        <div className=' flex w-fit bg-#FFFFFF'>
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
