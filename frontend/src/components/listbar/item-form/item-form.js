import React from 'react'
import { useFormLogic } from './item-form-logic'
export const ItemForm = () => {
  const{handleChangeScreen} = useFormLogic(); 
  return (
    <div className='flex flex-col h-screen w-screen md:w-fit pt-3 pl-6 md:pl-4 pr-2 md:px-6 overflow-y-scroll'>
      <div className='flex-1 space-y-12 md:space-y-4'>
        <p className='font-semibold text-2xl'>Add a new item</p>

        <div >
          <p>Name</p>
          <input
            type='text'
            placeholder='Enter a name'
            className='outline-none rounded-md p-2 w-[90%] border-[#BDBDBD] border-2'
          />
        </div>
        <div>
          <p>Note (optional)</p>
          <textarea
            placeholder='Enter a note'
            className='outline-none rounded-md p-2 w-[90%] border-[#BDBDBD] border-2 resize-none'
            name='note'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <div>
          <p className='mb-1'>Image (optional)</p>
          <input
            className='w-[90%] rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none'
            type='file'
            id='formFile'
          />
        </div>
        <div>
          <p>category</p>
          <input
            type='text'
            placeholder='Enter a category'
            className='outline-none rounded-md p-2 w-[90%] border-[#BDBDBD] border-2'
          />
        </div>
      </div>
      <div className='sticky bottom-0 bg-white py-4'>
          <div className='flex justify-center space-x-4'>
              <button className='hover:text-red-500 text-base'>cancel</button>
              <button onClick={handleChangeScreen} className='bg-[#F9A109] p-2 rounded-md text-white text-base shadow-md hover:bg-[#f9a109de] '>save</button>
          </div>
      </div>
    </div>
  )
}
