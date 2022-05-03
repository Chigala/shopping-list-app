import React from 'react'
import Lottie from 'react-lottie'
import EditIcon from '@mui/icons-material/Edit'
import { useShowCounter } from './cart-logic'
import animationData from './assets/list-lottie.json'

const buttonNumber = 4
export const Cart = () => {
  const {
    showCounter,
    CounterDiv,
    value,
    handleShowCounter,
    handleScreenChange
  } = useShowCounter(buttonNumber)
  const groceryAnimation = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
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
              <p className='text-2xl font-semibold'>
                shopping list
              </p>
              <EditIcon className='scale-75' />
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-[10px] text-[#828282]'>Fruit and vegetable</p>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
           
          </div>
          <div className='space-y-2'>
            <p className='text-[10px] text-[#828282]'>Fruit and vegetable</p>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
           
          </div>
          <div className='space-y-2'>
            <p className='text-[10px] text-[#828282]'>Fruit and vegetable</p>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
           
          </div>
          <div className='space-y-2'>
            <p className='text-[10px] text-[#828282]'>Fruit and vegetable</p>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='avocado'
                  className='accent-[#F9A109] cursor-pointer'
                />
                <label className='text-base' htmlFor='avocado'>Avocado</label>
              </div>
              {showCounter ? (
                <button
                  onDoubleClick={handleShowCounter}
                  className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
                >
                  {`${value} pcs`}
                </button>
              ) : (
                <CounterDiv />
              )}
            </div>
           
          </div>
          
          
        </div>
      </div>
      <div className='sticky bottom-0 py-4'>
        <div className='flex justify-center h-8'>
          <input
            type='text'
            className='rounded-md relative w-[65%] outline-none border-2 border-[#F9A109] pr-12 pl-3 '
            placeholder='Enter a Name'
          />
          <button className='bg-[#F9A109] px-2 py-2 rounded-md absolute right-12 '>
            save
          </button>
        </div>
      </div>
    </div>
  )
}
