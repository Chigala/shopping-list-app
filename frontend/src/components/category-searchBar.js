import React from 'react'
import { useSelector } from 'react-redux'
import { useGetCategoryQuery } from '../redux/api/category-slice'

export const CategorySearchBar = ({ categoryValue, show }) => {
  const state = useSelector(state => state.componentSlice.isAuth)

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
        <div className='h-16 overflow-y-hidden'>
          {sortedData.map(value => {
            return (
              <div className=' cursor-pointer hover:bg-gray-300 w-[90%] rounded-md p-2'>
                <p>{value.name}</p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
