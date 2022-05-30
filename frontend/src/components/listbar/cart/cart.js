import React, { useState } from 'react'
import Lottie from 'react-lottie'
import EditIcon from '@mui/icons-material/Edit'
import { useShowCounter } from './cart-logic'
import animationData from './assets/list-lottie.json'
import { useGetListQuery } from '../../../redux/api/list-slice'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { sendButtonValue } from '../../../redux/component-slice'
import { useDispatch } from 'react-redux'
import SendIcon from '@mui/icons-material/Send'

export const Cart = () => {
  const userData = useSelector(state => state.componentSlice.isAuth)
  const { data, isFetching } = useGetListQuery(userData._id)
  const [buttonValue, setButtonValue] = useState(0)
  const [checkTheButtonDiv, setCheckTheButtonDiv] = useState('')
  const [addToArray, setAddToArray] = useState([])
  const [inputListName, setInputListName] = useState('')
  const [checkAllCheckBoxes, setCheckAllCheckBoxes] = useState(false)
  const [showInputField, setShowInputField] = useState(false)
  const handleShowInputField = () => {
    setShowInputField(prev => !prev)
  }
  const handleInputChange = e => {
    setInputListName(e.target.value)
  }
  const checkAll = () => {
    setCheckAllCheckBoxes(prev => !prev)
  }
  const {
    showCounter,
    CounterDiv,
    value: numberValue,
    handleShowCounter,
    handleScreenChange
  } = useShowCounter(buttonValue)
  const groceryAnimation = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const dispatch = useDispatch()
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
                  <p className='text-2xl font-semibold'>shopping list</p>
                ) : (
                  <input
                    type='text'
                    className='outline-none text-xl w-fit font-semibold bg-[#FFF0DE]'
                    autoFocus
                    onChange={handleInputChange}
                    defaultValue={'Shopping List'}
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
              Object.keys(data).map((value, i) => {
                return (
                  <div key={i}>
                    <p className='text-[10px] text-[#828282]'>{value}</p>
                    {data[value].map(innerElement => {
                      return (
                        <div
                          className='flex justify-between items-center'
                          key={innerElement._id}
                        >
                          <div className='flex items-center space-x-2'>
                            <input
                              onChange={e => {
                                if (e.target.checked) {
                                  console.log('another value')
                                  setAddToArray([
                                    ...addToArray,
                                    {
                                      id: innerElement._id,
                                      name: innerElement.name
                                    }
                                  ])
                                } else {
                                  setAddToArray(
                                    addToArray.filter(
                                      product => product.id !== innerElement._id
                                    )
                                  )
                                }
                              }}
                              type='checkbox'
                              value={addToArray}
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
                              onDoubleClick={() => {
                                handleShowCounter()
                                setCheckTheButtonDiv(innerElement._id)
                                setButtonValue(innerElement.quantity)
                                dispatch(sendButtonValue(innerElement._id))
                              }}
                              className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                            >
                              {// checkTheButtonDiv === innerElement._id
                              //   ? `${innerElement.quantity} pcs`
                              //   : `${innerElement.quantity} pcs`
                              `${innerElement.quantity} pcs`}
                            </button>
                          ) : (
                            <CounterDiv counterId={innerElement._id} />
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

      <div className='sticky bottom-0 py-4'>
        <div className='flex justify-center space-x-4'>
          <button className='hover:text-red-500 text-base'>cancel</button>
          <button
            onClick={checkAll}
            className='bg-[#F9A109] p-2 rounded-md text-white text-base shadow-md hover:bg-[#f9a109de] '
          >
            complete
          </button>
        </div>
      </div>
    </div>
  )
}
