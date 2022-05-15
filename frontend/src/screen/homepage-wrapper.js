import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate  } from 'react-router'
import { ListBar } from '../components/listbar/listbar'
import { Sidebar } from '../components/sidebar/sidebar'

const HomePageWrapper = () => {
  const user = useSelector(state => state.componentSlice.isAuth)
  console.log(`this is the homepagewrapper user: ${user}`)
  return user ? (
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
    <Navigate to='/' />
  )
}
export default HomePageWrapper
