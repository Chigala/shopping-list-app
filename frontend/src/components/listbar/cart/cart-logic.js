import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { changeSidebarScreen } from '../../../redux/component-slice'
import { useNavigate } from 'react-router-dom'
import { useIncrementProductMutation,useDecrementProductMutation } from '../../../redux/api/product-slice'
import {useDeleteProductFromListMutation} from '../../../redux/api/list-slice'


export const useShowCounter = buttonValue => {
  const navigate = useNavigate()
  const [productArray, setProductArray] = useState([])
  const [showCounter, setShowCounter] = useState(false)
  const [decrementCounter] = useDecrementProductMutation()
  const [incrementCounter] = useIncrementProductMutation()
  const [deleteProduct] = useDeleteProductFromListMutation()
  const listId = useSelector(state => state.componentSlice.listId)

  const [value, setValue] = useState(buttonValue)
  useEffect(() => {
    setValue(buttonValue)
  }, [buttonValue])

  const dispatch = useDispatch()
  const handleDecrement = () => {
    const obj = Object.keys(productArray).reduce((acc, curr) => {
      acc[curr] = [
        ...productArray[curr].map(item =>
          value === item._id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      ]
      return acc
    }, {})
    setProductArray(obj)
    decrementCounter(value)
  }
  const handleIncrement = () => {
    const obj = Object.keys(productArray).reduce((acc, curr) => {
      acc[curr] = [
        ...productArray[curr].map(item =>
          value === item._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      ]
      return acc
    }, {})

    setProductArray(obj)
    incrementCounter(value)
  }
  const handleDelete = () => {
    const obj = Object.keys(productArray).reduce((acc, curr) => {
      acc[curr] = [...productArray[curr].filter(item => item._id !== value)]
      return acc
    }, {})
    setProductArray(obj)
    deleteProduct({value,listId})

  }
  const handleShowCounter = () => {
    setShowCounter(prev => !prev)
  }
  const CounterDiv = ({ counterId, quantity }) => {
    return (
      <div className='flex space-x-2 bg-white rounded-md py-1 pr-1'>
        <div
          onClick={handleDelete}
          className='bg-[#F9A109] object-fill -my-1 rounded-md'
        >
          <DeleteIcon className='text-white scale-75' />
        </div>
        <button
          onClick={() => {
            handleDecrement()
          }}
          className='text-base text-[#F9A109]'
        >
          -
        </button>
        <button
          onClick={() => {
            handleShowCounter()
          }}
          className='rounded-lg border-[2px] text-[10px] border-[#F9A109] text-[#F9A109] items-center px-2 hover:bg-[#f9a109b2] hover:text-white'
        >
          {`${quantity} pcs`}
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
    handleScreenChange,
    setProductArray,
    productArray
  }
}
