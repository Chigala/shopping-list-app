import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useItemLogic } from './item-logic'
export const Item = () => {
  const { handleAddToList, handleBack } = useItemLogic()
  return (
    <div >
      <div className='flex flex-col h-screen w-screen  md:max-w-xs pt-4 pr-8 md:pr-8 pl-6 overflow-y-scroll'>
        <div className='flex-1 space-y-6 md:space-y-4'>
          <div
            onClick={handleBack}
            className='flex cursor-pointer justify-start items-center'
          >
            <ArrowBackIcon className='text-[#F9A109]' />
            <p className='text-[#F9A109]'>Back</p>
          </div>
          <div className='h-[30%] w-full rounded-2xl'>
              <img className='object-cover rounded-2xl w-full h-full' src="https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
          </div>
          <div>
            <p>Name</p>
            <p className='text-base font-semibold'>Avocado</p>
          </div>
          <div>
            <p>Category</p>
            <p className='text-base font-semibold'>Fruits and vegetables</p>
          </div>
          <div>
            <p className='mb-1'>Note</p>
            <p className=' font-semibold text-base break-words'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, alias
              sed. Voluptates commodi a deserunt sequi natus, error illo et, alias
              consequatur minima neque voluptate numquam omnis vitae iusto atque
              ipsam cupiditate vel porro reiciendis. Maxime doloribus ea, atque
              praesentium provident quas unde assumenda. Eveniet aut autem iure
              quisquam reprehenderit!
            </p>
          </div>
        </div>
        <div className='mt-8 sticky bottom-0 py-4 bg-white'>
          <div className='flex justify-center space-x-4'>
            <button className='hover:text-red-500'> Delete</button>
            <button
              onClick={handleAddToList}
              className='bg-[#F9A109] p-2 rounded-md text-white shadow-md hover:bg-[#f9a109de] '
            >
              Add to List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
