import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useHistoryLogic } from './history-logic'
export const History = () => {
  const{handleChangeScreen} = useHistoryLogic();
  return (
    <div className='p-4 bg-[#FAFAFE] overflow-x-hidden h-screen'>
      <div>
        <p className='text-black font-semibold text-base mb-4'>Shopping History</p>
      </div>
      <div className='space-y-6'>
        <div onClick={handleChangeScreen} className='flex flex-col space-y-2'>
          <p>August 20th</p>
          <div className='flex container justify-between px-2 md:px-4 py-2 items-center rounded-md shadow-md bg-white'>
            <div>
              <p className=' whitespace-nowrap'>Grocery list</p>
            </div>
            <div className='flex items-center justify-between'>
              <CalendarMonthIcon className='scale-50 text-gray-500 ' />
              <p className='whitespace-nowrap text-[6px] sm:text-xs'>
                Monday 27th 2020
              </p>
              <button className='rounded-md px-1 ml-2 border-[1px] text-[8px] border-[#56CCF2]'>
                completed
              </button>
              <ChevronRightIcon className='text-[#F9A109] scale:50' />
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <p>August 20th</p>
          <div className='flex container justify-between px-2 md:px-4 py-2 items-center rounded-md shadow-md bg-white'>
            <div>
              <p className=' whitespace-nowrap'>Grocery list</p>
            </div>
            <div className='flex items-center justify-between'>
              <CalendarMonthIcon className='scale-50 text-gray-500 ' />
              <p className='whitespace-nowrap text-[6px] sm:text-xs'>
                Monday 27th 2020
              </p>
              <button className='rounded-md px-1 ml-2 border-[1px] text-[8px] border-[#56CCF2]'>
                completed
              </button>
              <ChevronRightIcon className='text-[#F9A109] scale:50' />
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <p>August 20th</p>
          <div className='flex container justify-between px-2 md:px-4 py-2 items-center rounded-md shadow-md bg-white'>
            <div>
              <p className=' whitespace-nowrap'>Grocery list</p>
            </div>
            <div className='flex items-center justify-between'>
              <CalendarMonthIcon className='scale-50 text-gray-500 ' />
              <p className='whitespace-nowrap text-[6px] sm:text-xs'>
                Monday 27th 2020
              </p>
              <button className='rounded-md px-1 ml-2 border-[1px] text-[8px] border-[#56CCF2]'>
                completed
              </button>
              <ChevronRightIcon className='text-[#F9A109] scale:50' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
