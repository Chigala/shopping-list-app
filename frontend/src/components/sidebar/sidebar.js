import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ReplayIcon from '@mui/icons-material/Replay'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSideBarLogic } from './sidebar-logic'

const badgeValue = 5
const hoverVariant = {
  hover: {
    scale: 1.2
  }
}
export const Sidebar = () => {
  const { handleLogout } = useSideBarLogic()
  const listData = useSelector(state => state.componentSlice.listData)
  console.log(`this is the listData: ${listData}`)
  const [array, setArray] = React.useState([])
  const findingMe = Object.keys(array).map(element => element)
  const badgeCountValue = findingMe
    .map(element =>
      array[element].reduce((acc, innerElement) => {
        let count = 0
        if (innerElement.completed === false) {
          count++
        }
        return acc + count
      }, 0)
    )
    .reduce((acc, element) => {
      return acc + element
    }, 0)
  React.useEffect(() => {
    setArray(listData)
  }, [listData])

  const location = useLocation()

  const getPathName = path => {
    return location.pathname === path
  }

  return (
    <>
      <motion.div className='flex flex-col  justify-between items-center h-screen py-4'>
        <motion.div
          onClick={handleLogout}
          variants={hoverVariant}
          whileHover='hover'
        >
          <Tooltip
            title='Logout'
            placement='right-start'
            className=' pl-2 scale-150 cursor-pointer'
          >
            <LogoutIcon />
          </Tooltip>
        </motion.div>
        <div className='flex flex-col space-y-8'>
          <motion.div variants={hoverVariant} whileHover='hover'>
            <Tooltip
              placement='right-start'
              title='Homepage'
              className={`${getPathName('/homepage') &&
                ' border-l-4 border-[#F9A109] rounded-sm '} pl-2`}
            >
              <Link to='/homepage'>
                <FormatListBulletedIcon />
              </Link>
            </Tooltip>
          </motion.div>
          <motion.div variants={hoverVariant} whileHover='hover'>
            <Tooltip
              placement='right-start'
              title='History'
              className={`${getPathName('/history') &&
                ' border-l-4 border-[#F9A109] rounded-sm '} pl-2`}
            >
              <Link to='/history'>
                <ReplayIcon />
              </Link>
            </Tooltip>
          </motion.div>
          <motion.div variants={hoverVariant} whileHover='hover'>
            <Tooltip
              placement='right-start'
              title='statistics'
              className={`${getPathName('/dashboard') &&
                ' border-l-4 border-[#F9A109] rounded-sm '} pl-2`}
            >
              <Link to='/dashboard'>
                <AnalyticsIcon className='scale-100' />
              </Link>
            </Tooltip>
          </motion.div>
        </div>
        <motion.div variants={hoverVariant} whileHover='hover'>
          <Tooltip
            title='List'
            placement='right-start'
            className='pl-2 cursor-pointer'
          >
            <Badge badgeContent={badgeCountValue} color='error'>
              <Link to='/listbar'>
                <ShoppingCartIcon className='scale-75' />
              </Link>
            </Badge>
          </Tooltip>
        </motion.div>
      </motion.div>
    </>
  )
}
