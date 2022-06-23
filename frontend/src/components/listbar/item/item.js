import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useItemLogic } from './item-logic'
import { useSelector } from 'react-redux'
import { TailwindModal } from '../../tailwindModal'

export const Item = () => {
  const value = useSelector(state => state.componentSlice.itemData)
  console.log(value)
  const {
    handleAddToList,
    handleBack,
    handleDeleteProduct,
    handleDialogOpen,
    handleDialogClose,
    openDialog, 
    handleBackToItemForm
  } = useItemLogic()
  return (
    <div>
      <div className='flex flex-col h-screen w-screen  md:max-w-xs pt-4 pr-8 md:pr-8 pl-6 overflow-y-scroll'>
        <div className='flex-1 space-y-6 md:space-y-4'>
          <div
            onClick={handleBackToItemForm}
            className='flex cursor-pointer justify-start items-center'
          >
            <ArrowBackIcon className='text-[#F9A109]' />
            <p className='text-[#F9A109]'>Back</p>
          </div>
          <div className='h-[30%] w-full rounded-2xl'>
            <img
              className='object-cover rounded-2xl w-full h-full'
              src={value.photoUrl}
              alt={value.name}
            />
          </div>
          <div>
            <p>Name</p>
            <p className='text-base font-semibold'>{value.name}</p>
          </div>
          <div>
            <p>Category</p>
            <p className='text-base font-semibold'>{value.categoryName}</p>
          </div>
          <div>
            <p className='mb-1'>Note</p>
            <p className=' font-semibold text-base break-words'>
              {value.description}
            </p>
          </div>
        </div>
        <TailwindModal
          open={openDialog}
          handleClickOpen={handleDialogOpen}
          handleSubmit={handleDeleteProduct}
          handleClose={handleDialogClose}
          isComplete={false}
          text={"Are you sure you want to delete this product? "}
          heading={"DeleteProduct"}
          leftButtonName={"cancel"}
          rightButtonName={"delete"}
        />
        <div className='mt-8 sticky bottom-0 py-4 bg-white'>
          <div className='flex justify-center space-x-4'>
            <button
              onClick={handleDialogOpen}
              className='hover:text-red-500'
            >
              {' '}
              Delete
            </button>
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
