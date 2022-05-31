import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { changeSidebarScreen } from '../../../redux/component-slice'
import { useNavigate } from 'react-router-dom'

export const useShowCounter = buttonValue => {
  const navigate = useNavigate()
  const [showCounter, setShowCounter] = useState(false)
  const [value, setValue] = useState(buttonValue)
  useEffect(() => {
    setValue(buttonValue)
  }, [buttonValue])
  
  const dispatch = useDispatch()
  console.log(`this is another buttonValue ${value}`)
  const buttonId = useSelector(state => state.componentSlice.buttonValue)
  const handleDecrement = () => {
    value > 0 && setValue(prevValue => prevValue - 1)
  }
  const handleIncrement = () => {
    setValue(prevValue => prevValue + 1)
  }
  const handleShowCounter = () => {
    setShowCounter(prev => !prev)
  }
  const CounterDiv = ({ counterId }) => {
    return (
      <div className='flex space-x-2 bg-white rounded-md py-1 pr-1'>
        <div className='bg-[#F9A109] object-fill -my-1 rounded-md'>
          <DeleteIcon className='text-white scale-75' />
        </div>
        <button
          onClick={() => {
            if (counterId === buttonId) {
              console.log(`this is the counterId: ${counterId}`)
              handleDecrement()
            }
          }}
          className='text-base text-[#F9A109]'
        >
          -
        </button>
        <button
          onDoubleClick={() => {
            if (counterId === buttonId) {
              setValue(buttonValue)
              handleShowCounter()
            }
          }}
          className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
        >
          {`${value} pcs`}
        </button>
        <button onClick={handleIncrement} className='text-base text-[#F9A109]'>
          +
        </button>
      </div>
    )
  }
  const handleScreenChange = () => {
    const data = 'item-form'
    !window.matchMedia('(max-width: 767px)').matches
      ? dispatch(changeSidebarScreen(data))
      : navigate('/itemform')
  }
  return {
    showCounter,
    setShowCounter,
    CounterDiv,
    value,
    handleShowCounter,
    handleScreenChange
  }
}
