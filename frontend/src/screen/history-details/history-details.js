import React from 'react'
import { format } from 'date-fns'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useHistoryDetailsLogic } from './history-details-logic'
export const HistoryDetails = () => {
  const { handleChangeScreen, filteredData } = useHistoryDetailsLogic()
  console.log('the filtered data', filteredData.name)
  return (
    <div className='h-screen container py-4 px-6 bg-[#FAFAFE] overflow-auto space-y-4'>
      <div onClick={handleChangeScreen} className='cursor-pointer'>
        <ArrowBackIcon className='text-[#F9A109]' />
      </div>
      <div>
        <p>{filteredData.name}</p>
        <div className='flex items-center'>
          <CalendarMonthIcon className='scale-75 text-gray-500' />
          <p className='text-[9px]'>
            {
              format(new Date(filteredData.updatedAt), 'EEEE, MMMM yyyy')
            }
          </p>
        </div>
        <div>
          {Object.keys(filteredData.data).map(element => {
            return (
              <div>
                <p className='my-2'>{element}</p>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4'>
                  {filteredData.data[element].map(innerEle => {
                    return (
                      <div className='px-5 flex container bg-white justify-around py-3 rounded-md hover:shadow-lg cursor-pointer'>
                        <div className='w-[50%]'>
                          <p className='break-words'>{innerEle.name}</p>
                        </div>
                        <p className='text-[#F9A109]'>{innerEle.quantity} pcs</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
