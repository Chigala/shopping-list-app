import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { useGetCategoryQuery } from '../../redux/api/category-slice'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import {useHomepageLogic} from "./homepage-logic"

export const Homepage = () => {
  const{handleSendDataToItemPage} = useHomepageLogic()
  const state = useSelector(state => state.componentSlice.isAuth)
  const { data, isFetching, isLoading, error } = useGetCategoryQuery(state._id)
  // console.log(data)
  return (
    <div className='h-[100vh] flex flex-col py-4 px-4 space-y-4 bg-[#FAFAFE] overflow-auto'>
      <div className='flex justify-center item-center space-x-4'>
        <div className='hidden md:inline'>
          <p className='text-2xl text-[#F9A109]'>
            Lister{' '}
            <span className='text-black text-lg'>
              allows you to take <br /> your shopping list where ever you go
            </span>
          </p>
        </div>
        <div className='relative'>
          <SearchIcon className='scale-75 absolute top-1 md:top-3 left-2' />
          <input
            type='text'
            className='outline-none border-[1px] text-sm border-gray-200 rounded-lg py-1 md:py-3 pl-8 pr-4  w-56'
          />
        </div>
      </div>
      <div className='space-y-10'>
        {isLoading ? (
          <CircularProgress />
        ) : (
          data?.map(value => {
            return (
              <div  key={value._id} className='space-y-3'>
                <p className='text-sm font-semibold'> {value.name}</p>
                <div className='container mx-auto'>
                  <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 md:gap-x-2 gap-y-6'>
                    {value.items.length === 0?  ( <p>oops! No item</p> ): value.items.map(product => {
                      return (
                        <div key={product._id} onClick={() => handleSendDataToItemPage(product)} className='flex group justify-around py-3 px-4 md:px-4 lg:px-8 w-fit items-center border-[1px] rounded-md shadow-md cursor-pointer hover:bg-gray-500 hover:text-white'>
                          <p>{product.name}</p>
                          <AddIcon className='text-[#C0C1C4] group-hover:text-white scale-75' />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
