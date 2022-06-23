import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { ListBar } from '../components/listbar/listbar'
import { Sidebar } from '../components/sidebar/sidebar'

const HomePageWrapper = () => {

  const newUser = useSelector(state => state.componentSlice.isLoggedIn)
  const location = useLocation()
  console.log(newUser)
  return newUser ? (
    <>
      <div className='flex'>
        <div className=' w-fit bg-#FFFFFF'>
          <Sidebar />
        </div>
        <div className='flex-1 overflow-x-hidden'>
          <Outlet />
        </div>
          <div className='hidden md:inline w-fit'>
            <ListBar />
          </div>
      </div>
    </>
  ) : (
    <Navigate to='/login ' state={{ from: location }} replace />
  )
}
export default HomePageWrapper
