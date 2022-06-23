import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { changeSidebarScreen } from '../../../redux/component-slice'
import { useNavigate } from 'react-router-dom'
import {
  useIncrementProductMutation,
  useDecrementProductMutation
} from '../../../redux/api/product-slice'
import { useDeleteProductFromListMutation } from '../../../redux/api/list-slice'
import {
  useGetListNameQuery,
  useUpdateListNameMutation
} from '../../../redux/api/list-slice'
import { useGetListQuery } from '../../../redux/api/list-slice'
import { updateListData, getListId,sendDataToItem } from '../../../redux/component-slice'

export const useShowCounter = () => {
  const navigate = useNavigate()
  const [productArray, setProductArray] = useState([])
  const [showCounter, setShowCounter] = useState(false)
  const [decrementCounter] = useDecrementProductMutation()
  const [incrementCounter] = useIncrementProductMutation()
  const [deleteProduct] = useDeleteProductFromListMutation()

  const listId = useSelector(state => state.componentSlice.listId)
  const userData = useSelector(state => state.componentSlice.isAuth)
  const { data, isFetching } = useGetListQuery(userData._id)
  const { data: unpopulatedList, isLoading } = useGetListNameQuery(userData._id)
  const [buttonValue, setButtonValue] = useState(0)
  const [checkTheButtonDiv, setCheckTheButtonDiv] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [inputListName, setInputListName] = useState('')
  const [showInputField, setShowInputField] = useState(false)
  const [complete, setComplete] = useState(false)
  const [updateListName] = useUpdateListNameMutation()
  const handleDialogOpen = () => {
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }
  const handleCancelDialog = () => {
    console.log('cancelled the whole list ')
  }
  const handleSubmitDialog = () => {
    console.log('submitted the whole button ')
  }
  const handleShowInputField = async () => {
    setShowInputField(prev => !prev)
    const formData = new FormData()
    formData.append('name', inputListName)
    console.log(formData.get('name'))
    const listId = unpopulatedList?._id
    console.log('this is the listId', listId)
    await updateListName({ formData, listId })
  }
  const handleInputChange = e => {
    setInputListName(e.target.value)
  }
  const checkAll = e => {
    const obj = Object.keys(productArray).reduce((acc, curr) => {
      acc[curr] = [
        ...productArray[curr].map(item => ({
          ...item,
          completed: e.target.checked
        }))
      ]
      return acc
    }, {})

    console.log(obj)
    setProductArray(obj)
  }

  const [value, setValue] = useState(buttonValue)
  useEffect(() => {
    setValue(buttonValue)
  }, [buttonValue])

  const dispatch = useDispatch()
  useEffect(() => {
    const transformTheDataFromTheApi = () => {
      if (isFetching) {
        console.log('is fetching')
      } else {
        setProductArray(data)
      }
    }
    transformTheDataFromTheApi()
    dispatch(getListId(unpopulatedList?._id))
  }, [data])
  useEffect(() => {
    dispatch(updateListData(productArray))
  }, [productArray])
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
    deleteProduct({ value, listId })
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
      dispatch(sendDataToItem(""))
  }
  return {
    showCounter,
    setShowCounter,
    CounterDiv,
    value,
    handleShowCounter,
    handleScreenChange,
    setProductArray,
    productArray,
    handleDialogOpen,
    handleCancelDialog,
    handleShowInputField,
    handleInputChange,
    checkAll,
    handleDialogClose,
    handleSubmitDialog,
    isLoading,
    setButtonValue,
    checkTheButtonDiv,
    setCheckTheButtonDiv,
    openDialog,
    showInputField,
    complete,
    setComplete,
    unpopulatedList,
    isFetching, 
  }
}
