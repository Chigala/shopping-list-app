import React from 'react'

import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { ReactComponent as Logo } from '../../assets/icons/google-icon.svg'

import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from '../../helpers/form-validation'
import { useForm } from 'react-hook-form'
import { useRegisterFormLogic } from './register-form-logic'
import { useHandleRegister } from '../../screen/register/register-logic'
import { useHandleLogin } from '../../screen/login/login-logic'
import { LoginSchema } from '../../helpers/form-validation'
import CircularProgress from '@mui/material/CircularProgress'
import { useSnackBar } from '../snackbar'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'



export const RegisterForm = ({ loginText, registerText, isRegister }) => {
  const isWeb = !window.matchMedia('(max-width: 767px)').matches; 
  const {
    visible,
    confirmVisible,
    handleChangeConfirmVisible,
    handleChangeVisible,
    navigateToLogin,
    navigateToRegister
  } = useRegisterFormLogic()

  const { handleRegister } = useHandleRegister()
  const { handleLogin, isLoading } = useHandleLogin()
  const { handleClick, handleClose, open, vertical, horizontal } = useSnackBar()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(isRegister ? RegisterSchema : LoginSchema),
    mode: 'onBlur'
  })

  return (
    <>
      <div className='w-screen md:w-1/2 my-auto px-6'>
        <div className='space-y-6'>
          <p className='text-[#FFC901] font-bold text-2xl'>
            {isRegister ? 'Sign Up' : 'Sign In'}
          </p>
          <div className='space-y-4'>
            <p>
              {isRegister ? registerText : loginText} <br /> You can{' '}
              {isRegister ? (
                <span
                  className='text-[#FFC901] cursor-pointer font-bold'
                  onClick={navigateToLogin}
                >
                  {' '}
                  Login here !
                </span>
              ) : (
                <span
                  className='text-[#FFC901] cursor-pointer font-bold'
                  onClick={navigateToRegister}
                >
                  {' '}
                  Register here !
                </span>
              )}
            </p>
            <form
              action=''
              autoComplete='on'
              onSubmit={
                isRegister
                  ? handleSubmit(handleRegister)
                  : handleSubmit(handleLogin)
              }
            >
              <div className='space-y-8'>
                <div>
                  <p className='text-[9px]'>Email</p>
                  <div className='relative'>
                    <input
                      autoComplete='email'
                      type='text'
                      {...register('email')}
                      name='email'
                      placeholder='Enter your email address'
                      className='outline-none border-b-2 border-black px-6 w-[95%]  md:w-4/5 focus:border-[#FFC901]'
                    />
                    <p className='text-red-500 text-[8px]'>
                      {errors.email?.message}
                    </p>
                    <MailOutlineIcon className='scale-50 absolute left-0 -top-1' />
                  </div>
                </div>
                {isRegister && (
                  <div>
                    <p className='text-[9px]'>Username</p>
                    <div className='relative'>
                      <input
                        type='text'
                        {...register('username')}
                        name='username'
                        placeholder='Enter your username'
                        className='outline-none border-b-2 border-black px-6 w-[95%]  md:w-4/5 focus:border-[#FFC901]'
                      />
                      <p className='text-red-500 text-[8px]'>
                        {errors.username?.message}
                      </p>
                      <PermIdentityIcon className='scale-50 absolute left-0 -top-1' />
                    </div>
                  </div>
                )}
                <div>
                  <p className='text-[9px]'>Password</p>
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
                    {!isRegister && (
                      <div className='flex justify-between mt-2 items-center'>
                        <div className='flex items-center space-x-1'>
                          <input
                            type='checkbox'
                            name='remember-me'
                            className='accent-[#FFC901]'
                          />
                          <label
                            htmlFor='remember-me'
                            className='text-gray-500 text-[11px]'
                          >
                            Remember me
                          </label>
                        </div>
                        <p
                          onClick={handleClick(isWeb?{
                            vertical: 'bottom',
                            horizontal: 'left'
                          }: {vertical:"top",horizontal:"center"})}
                          className='text-gray-500 cursor-pointer text-[9px]'
                        >
                          forgot password?
                        </p>
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                          key={vertical + horizontal}
                        >
                          <Alert
                            onClose={handleClose}
                            severity='success'
                            sx={{ width: '100%' }}
                          >
                            A password reset Email has been sent to you
                          </Alert>
                        </Snackbar>
                      </div>
                    )}
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
                {isRegister && (
                  <div>
                    <p className='text-[9px]'>Confirm password</p>
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
                )}
                <div>
                  <button
                    type='submit'
                    className='w-[95%]  md:w-4/5 text-center bg-[#FFC901] h-8 rounded-lg text-white '
                  >
                    {isLoading ? (
                      <div className='scale-50 flex items-center justify-center'>
                        <CircularProgress color='inherit' />
                      </div>
                    ) : (
                      <>{isRegister ? 'Register' : 'Login'}</>
                    )}
                  </button>
                  {!isRegister && (
                    <div className='space-y-4'>
                      <div className='text-center w-[95%]  md:w-4/5 mt-2'>
                        <p className='text-gray-500  text-[9px]'>
                          Or continue with
                        </p>
                      </div>
                      <div className='w-[95%]  md:w-4/5 shadow-md'>
                        <div className='flex items-center justify-center'>
                          <div className='scale-50'>
                            <Logo />
                          </div>
                          <p>Sign in with google</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
