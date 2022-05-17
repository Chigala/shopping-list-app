import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCategoryQuery } from '../redux/api/category-slice'
import { openSearchBar,changeCategoryValue } from '../redux/component-slice'

export const CategorySearchBar = ({ categoryValue }) => {
  const state = useSelector(state => state.componentSlice.isAuth)
  const show = useSelector(state => state.componentSlice.openCategorySearchBar)
  const dispatch = useDispatch()

  const [sortedData, setSortedData] = React.useState('')

  const { data } = useGetCategoryQuery(state._id)

  React.useEffect(() => {
    const displaySearchedCategory = () => {
      const sortedCategory = data.filter(value =>
        value.name.toLowerCase().includes(categoryValue.toLowerCase())
      )
      setSortedData(sortedCategory.splice(0, 5))
    }
    displaySearchedCategory()
  }, [categoryValue, data])

  return (
    <>
      {show && (
        <div className='h-fit overflow-y-hidden border-2  rounded-md w-[90%]'>
          {sortedData.length === 0
            ?  dispatch(openSearchBar()) 
            : sortedData.map(value => {
                return (
                  <div
                  key={value._id}
                    onClick={() => {
                      dispatch(changeCategoryValue(value.name)) 
                      dispatch(openSearchBar(false))
                    }}
                    className=' cursor-pointer hover:bg-gray-300 w-full  rounded-md p-2'
                  >
                    <p>{value.name}</p>
                  </div>
                )
              })}
        </div>
      )}
    </>
  )
}
