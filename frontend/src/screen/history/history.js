import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { format } from 'date-fns'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useHistoryLogic } from './history-logic'
export const History = () => {
  const { handleChangeScreen,handleDispatchId,  data } = useHistoryLogic()
  return (
    <div className='p-4 bg-[#FAFAFE] overflow-x-hidden h-screen'>
      <div>
        <p className='text-black font-semibold text-base mb-4'>
          Shopping History
        </p>
      </div>
      <div className='space-y-6'>
        {data?.map(element => {
          return (
            <div
            key={element.id}
              onClick={()=> {
                handleChangeScreen()
                handleDispatchId(element.id)
              }}
              className='flex flex-col space-y-2'
            >
              <p>{format(new Date(element.updatedAt), 'EEEE, MMMM yyyy')}</p>
              <div className='flex container justify-between px-2 md:px-4 py-2 items-center rounded-md shadow-md bg-white'>
                <div>
                  <p className=' whitespace-nowrap'>{element.name}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <CalendarMonthIcon className='scale-50 text-gray-500 ' />
                  <p className='whitespace-nowrap text-[6px] sm:text-xs'>
                    {format(new Date(element.updatedAt), 'EEEE, MMMM yyyy')}
                  </p>
                  <button className={ `${element.listType === "completed" ? "border-green-500 text-green-500":"border-red-500"} rounded-md px-1 ml-2 border-[2px] text-[8px] font-semibold border-[#56CCF2] ` }>
                    completed
                  </button>
                  <ChevronRightIcon className='text-[#F9A109] scale:50' />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
