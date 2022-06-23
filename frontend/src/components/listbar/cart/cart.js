import React, { useState } from 'react'
import Lottie from 'react-lottie'
import EditIcon from '@mui/icons-material/Edit'
import { useShowCounter } from './cart-logic'
import animationData from './assets/list-lottie.json'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import SendIcon from '@mui/icons-material/Send'
import { TailwindModal } from '../../tailwindModal'

export const Cart = () => {
  const {
    showCounter,
    CounterDiv,
    value: numberValue,
    handleShowCounter,
    handleScreenChange,
    setProductArray,
    productArray,
    showInputField,
    handleInputChange,
    handleDialogOpen,
    handleCancelDialog,
    handleShowInputField,
    checkAll,
    handleDialogClose,
    handleSubmitDialog,
    isLoading,
    setButtonValue,
    checkTheButtonDiv,
    setCheckTheButtonDiv,
    openDialog,
    complete,
    setComplete,
    unpopulatedList,
    isFetching, 
  } = useShowCounter()
  const groceryAnimation = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const modalCancelText = 'Are you sure you want to cancel the list?'
  const modalCancelHeader = 'Cancel List'
  const modalCompleteHeader = 'Complete List'
  const modalCompleteText = 'Are you sure you want to complete the list?'

  const handleCancel = () => {
    handleDialogClose()
    const data = {
      target: {
        checked: false
      }
    }
    checkAll(data)
    console.log("the handle cancel was called")
    
  }
  return (
    <div className='flex flex-col h-screen w-screen md:w-fit px-4'>
      <div className='flex-1 bg-[#FFF0DE] pt-5 px-6 space-y-3  overflow-y-scroll'>
        <div className='flex flex-row justify-center bg-[#80485B] rounded-xl items-center p-2'>
          <div>
            <Lottie options={groceryAnimation} height={100} width={100} />
          </div>
          <div className='space-y-2'>
            <p className='text-white'>
              Didn't Find what you <br />
              need?
            </p>
            <button
              onClick={handleScreenChange}
              className='p-2 bg-white rounded-md font-semibold hover:bg-gray-100'
            >
              Add item
            </button>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <div className='flex items-center justify-between'>
              <div>
                {!showInputField ? (
                  <p className='text-2xl font-semibold'>
                    {unpopulatedList?.name}
                  </p>
                ) : (
                  <input
                    type='text'
                    className='outline-none text-xl w-fit font-semibold bg-[#FFF0DE]'
                    autoFocus
                    onChange={handleInputChange}
                    defaultValue={unpopulatedList?.name}
                  />
                )}
              </div>
              <div onClick={handleShowInputField}>
                {!showInputField ? (
                  <EditIcon className='scale-75' />
                ) : (
                  <SendIcon className='scale-75' />
                )}
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            {isFetching ? (
              <div className='flex justify-center items-center'>
                <CircularProgress />
              </div>
            ) : (
              Object.keys(productArray).map((value, i) => {
                return (
                  <div key={i}>
                    <p className='text-[10px] text-[#828282]'>{value}</p>
                    {productArray[value].map(innerElement => {
                      return (
                        <div
                          className='flex justify-between items-center'
                          key={innerElement._id}
                        >
                          <div className='flex items-center space-x-2'>
                            <input
                              onChange={e => {
                                const index = productArray[value].findIndex(
                                  index => index._id === innerElement._id
                                )
                                const newState = productArray[value].map(
                                  (prd, i) =>
                                    i === index
                                      ? { ...prd, completed: e.target.checked }
                                      : prd
                                )
                                const newProductArray = {
                                  ...productArray,
                                  [value]: newState
                                }
                                console.log(newProductArray)
                                setProductArray(newProductArray)
                              }}
                              type='checkbox'
                              checked={innerElement.completed}
                              name='avocado'
                              className='accent-[#F9A109] cursor-pointer'
                            />
                            <label className='text-base' htmlFor='avocado'>
                              {innerElement.name}
                            </label>
                          </div>

                          {showCounter ||
                          checkTheButtonDiv !== innerElement._id ? (
                            <button
                              onClick={() => {
                                handleShowCounter()
                                setCheckTheButtonDiv(innerElement._id)
                                setButtonValue(innerElement._id)
                              }}
                              className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                            >
                              {`${innerElement.quantity} pcs`}
                            </button>
                          ) : (
                            <CounterDiv
                              counterId={innerElement._id}
                              quantity={innerElement.quantity}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <TailwindModal
        open={openDialog}
        handleClickOpen={handleDialogOpen}
        handleSubmit={complete ? handleSubmitDialog : handleCancelDialog}
        handleClose={handleDialogClose}
        isComplete={complete}
        text={complete ? modalCompleteText : modalCancelText}
        heading={complete ? modalCompleteHeader : modalCancelHeader}
        leftButtonName={complete? "cancel": "back"}
        rightButtonName={complete? "complete": "cancel"}
        handleCancel={handleCancel}
      />
      <div className='sticky bottom-0 py-4'>
        <div className='flex justify-center space-x-4'>
          <button
            className='hover:text-red-500 text-base'
            onClick={() => {
              setComplete(false)
              handleDialogOpen()
            }}
          >
            cancel
          </button>
          <div>
            <label
              onClick={() => {
                setComplete(true)
                handleDialogOpen()
              }}
            >
              <input type='checkbox' className='hidden' onChange={checkAll} />
              <span className='bg-[#F9A109] p-2 rounded-md text-white text-base shadow-md hover:bg-[#f9a109de] '>
                complete
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
