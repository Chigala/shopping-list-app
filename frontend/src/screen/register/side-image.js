import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone'

export const SideImage = ({isConfirmPassword,register}) => {
  return (
    <div className=' hidden md:w-1/2 m-3 bg-transparent shadow-lg  rounded-md md:flex relative justify-center items-center'>
        <div className='bg-register-image bg-contain bg-no-repeat bg-center w-[90%] h-1/2'></div>
        <div className='absolute bottom-16 left-9 text-3xl font-semibold'>
          {isConfirmPassword? "Welcome to ":<div>{register ? 'Sign up to ' : 'Sign in to '}</div>}
          <span className='text-[#FFC901]'>Lister</span>
        </div>
        <div className='flex items-center absolute top-4 right-2'>
          <PhoneIcon className='scale-50' />
          <p className='text-[10px]'>+2348168618043</p>
        </div>
      </div>
  )
}
