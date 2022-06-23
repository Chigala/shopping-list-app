import React from 'react'
import { useForm } from 'react-hook-form'
import { useItemLogic } from '../item/item-logic'
import { useSelector } from 'react-redux'
import { useGetCategoryQuery } from '../../../redux/api/category-slice'


/*
TODO:
- set the fetch call to come from the server then when it is refetching you show a circular progress indicator 

 */
export const ItemForm = () => {
  const [categoryValue, setCategoryValue] = React.useState('')
  const [show, setShow] = React.useState(false)
  const { handleSubmitItemForm, handleBack } = useItemLogic(categoryValue)
  const value = useSelector(state => state.componentSlice.itemData)

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: value.name,
      category: value.categoryName,
      image: value.photoUrl,
      description: value.description
    }
  })

  const handleChange = e => {
    setValue('category', `${e.target.value}`)
    setCategoryValue(e.target.value)
    setShow(true)
  }
  const handleInputBlur = () => {
    setTimeout(() => {
      setShow(false)
    }, 100)
  }
  const state = useSelector(state => state.componentSlice.isAuth)

  const [sortedData, setSortedData] = React.useState('')

  const { data } = useGetCategoryQuery(state._id)
  console.log(`this is the data: ${data}`)

  React.useEffect(() => {
    const displaySearchedCategory = () => {
      console.log(`this is the : ${data}`)
      
      const mapped = data.map(value=>value.name)
      console.log(mapped); 
      const sortedCategory = data.filter(value =>
        value.name.toLowerCase().includes(categoryValue?.toLowerCase())
      )
      setSortedData(sortedCategory.splice(0, 5))
    }
    displaySearchedCategory()
  }, [categoryValue, data])

  return (
    <div className='flex flex-col h-screen w-screen md:w-fit pt-3 pl-6 md:pl-4 pr-2 md:px-6 overflow-y-scroll'>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit(handleSubmitItemForm)}
      >
        <div className='flex-1 mb-12 space-y-12 md:space-y-4'>
          <p className='font-semibold text-2xl'>Add a new item</p>

          <div>
            <p>Name</p>
            <input
              type='text'
              {...register('name')}
              name='name'
              placeholder='Enter a name'
              className='outline-none rounded-md p-2 w-[90%] border-[#BDBDBD] border-2'
            />
          </div>
          <div>
            <p>Note (optional)</p>
            <textarea
              placeholder='Enter a note'
              className='outline-none rounded-md p-2 w-[90%] border-[#BDBDBD] border-2 resize-none'
              {...register('description')}
              name='description'
              cols='30'
              rows='10'
            ></textarea>
          </div>
          <div>
            <p className='mb-1'>Image (optional)</p>
            <input
              className='w-[90%] rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none'
              {...register('image')}
              name='image'
              type='file'
              id='formFile'
            />
          </div>

          <div>
            <p>category</p>
            <input
              type='text'
              {...register('category')}
              name='category'
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder='Enter a category'
              className='outline-none rounded-md p-2 w-[90%] border-[#BDBDBD] border-2'
            />
          </div>

          <div>
            {show && (
              <div className='h-fit overflow-y-hidden border-2  rounded-md w-[90%]'>
                {sortedData.length === 0
                  ? setShow(false)
                  : sortedData.map(value => {
                      return (
                        <div
                          key={value?._id}
                          onClick={() => {
                            setShow(false)
                            setValue('category', `${value.name}`)
                          }}
                          className=' cursor-pointer hover:bg-gray-300 w-full  rounded-md p-2'
                        >
                          <p>{value?.name}</p>
                        </div>
                      )
                    })}
              </div>
            )}
          </div>
        </div>
        <div className='sticky bottom-0  bg-white py-4'>
          <div className='flex justify-center space-x-4'>
            <button onClick={handleBack} className='hover:text-red-500 text-base'>Cancel</button>
            <button
              type='submit'
              className='bg-[#F9A109] p-2 rounded-md text-white text-base shadow-md hover:bg-[#f9a109de] '
            >
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
