import React from 'react'
import { SideImage } from '../register/side-image'
import { useRegisterFormLogic } from '../../components/register-form/register-form-logic'
import { changePasswordSchema } from '../../helpers/form-validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { CircularProgress } from '@mui/material'
import { useChangePasswordLogic } from './create-password-logic'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch} from "react-redux"
import { updatePasswordParams } from '../../redux/component-slice'

export const CreatePassword = () => {
  const isLoading = false; 
  const isConfirmPassword = true; 
  const params = useParams();
  const dispatch = useDispatch(); 
 
  
  useEffect(() => {
    const updateParams = (data) => {
        dispatch(updatePasswordParams(data))
    }
    updateParams(params.id); 
    console.log(params.id)
  }, [])
  
  
  const { visible, handleChangeVisible,handleChangeConfirmVisible,
    confirmVisible, } = useRegisterFormLogic()
  const {
    register,
    handleSubmit,
    
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur'
  })
 const{handleChangePassword} = useChangePasswordLogic()

  return (
    <div className='w-screen h-screen flex flex-row '>
      <div className='w-screen md:w-1/2 my-auto px-6 space-y-12'>
        <p className='text-[#FFC901] font-bold text-2xl'>Change Password</p>
        <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-10 ">
          
            <div>
                <p className='text-[9px]'>New Password</p>
                <div className='relative w-[95%]  md:w-4/5'>
                  <input
                    type={visible ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder='Enter your password'
                    {...register('password')}
                    name='password'
                    className='outline-none border-b-2 border-black px-6  w-full focus:border-[#FFC901]'
                  />
                  <p className='text-red-500 text-[8px]'>
                    {errors.password?.message}
                  </p>
                  <HttpsOutlinedIcon className='scale-50 absolute left-0 -top-1' />
                  {visible ? (
                    <div onClick={handleChangeVisible}>
                      <VisibilityOutlinedIcon className='scale-75 absolute  right-0 text-gray-500  -top-1 cursor-pointer' />
                    </div>
                  ) : (
                    <div onClick={handleChangeVisible}>
                      <VisibilityOffOutlinedIcon className='scale-75 absolute  right-0 text-gray-500  -top-1 cursor-pointer' />
                    </div>
                  )}
                </div>
            </div>
            <div>
              <p className='text-[9px]'>Confirm Password</p>
              <div className='relative w-[95%]  md:w-4/5'>
                <input
                  type={confirmVisible ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  name='confirmPassword'
                  placeholder='Enter your password'
                  className='outline-none border-b-2 border-black px-6 w-full focus:border-[#FFC901]'
                />
                <HttpsOutlinedIcon className='scale-50 absolute left-0 -top-1' />
                <p className='text-red-500 text-[8px]'>
                  {errors.confirmPassword?.message}
                </p>

                {confirmVisible ? (
                  <div onClick={handleChangeConfirmVisible}>
                    <VisibilityOutlinedIcon className='scale-75 absolute cursor-pointer right-0 text-gray-500  -top-1' />
                  </div>
                ) : (
                  <div onClick={handleChangeConfirmVisible}>
                    <VisibilityOffOutlinedIcon className='scale-75 absolute cursor-pointer text-gray-500 right-0 -top-1' />
                  </div>
                )}
              </div>
            </div>
            <button
                    type='submit'
                    className='w-[95%]  md:w-4/5 text-center bg-[#FFC901] h-8 rounded-lg text-white '
                  >
                    {isLoading ? (
                      <div className='scale-50 flex items-center justify-center'>
                        <CircularProgress color='inherit' />
                      </div>
                    ) : 
                      'Change Password'
                    }
                  </button>
          
        </form>
      </div>
      <SideImage isConfirmPassword={isConfirmPassword} />
    </div>
  )
}
