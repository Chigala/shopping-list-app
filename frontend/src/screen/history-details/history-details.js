import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useHistoryDetailsLogic } from './history-details-logic'
export const HistoryDetails = () => {
  const { handleChangeScreen } = useHistoryDetailsLogic()
  return (
    <div className='h-screen container py-4 px-6 bg-[#FAFAFE] overflow-auto space-y-4'>
      <div onClick={handleChangeScreen} className='cursor-pointer'>
        <ArrowBackIcon className='text-[#F9A109]' />
      </div>
      <div>
        <p>Chigala's Birthday party</p>
        <div className='flex items-center'>
          <CalendarMonthIcon className='scale-75 text-gray-500' />
          <p className='text-[9px]'>June 29th 2021</p>
        </div>
        <div>
          <div>
            <p className='my-2'>cookies</p>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4'>
              <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                <div className='w-[50%]'>
                  <p className='break-words'>friends online</p>
                </div>
                <p className='text-[#F9A109]'>3 pcs</p>
              </div>
              <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                <div className='w-[50%]'>
                  <p className='break-words'>friends online</p>
                </div>
                <p className='text-[#F9A109]'>3 pcs</p>
              </div>
              <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                <div className='w-[50%]'>
                  <p className='break-words'>friends online</p>
                </div>
                <p className='text-[#F9A109]'>3 pcs</p>
              </div>
              <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                <div className='w-[50%]'>
                  <p className='break-words'>friends online</p>
                </div>
                <p className='text-[#F9A109]'>3 pcs</p>
              </div>
              <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                <div className='w-[50%]'>
                  <p className='break-words'>friends online</p>
                </div>
                <p className='text-[#F9A109]'>3 pcs</p>
              </div>
              <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                <div className='w-[50%]'>
                  <p className='break-words'>friends online</p>
                </div>
                <p className='text-[#F9A109]'>3 pcs</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
