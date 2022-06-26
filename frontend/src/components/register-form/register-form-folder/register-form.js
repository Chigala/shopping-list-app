import React from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { ReactComponent as Logo } from '../../../assets/icons/google-icon.svg'

import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from '../../../helpers/form-validation'
import { useForm } from 'react-hook-form'
import { useRegisterFormLogic } from '../register-form-logic'
import { useHandleRegister } from '../../../screen/register/register-logic'
import { useHandleLogin } from '../../../screen/login/login-logic'
import { LoginSchema } from '../../../helpers/form-validation'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch } from 'react-redux'
import { updateSnackbar } from '../../../redux/snackbar'
import { useNavigate } from 'react-router'
import { useForgotPasswordLogic } from '../../../screen/forgot-password/forgot-password-logic'

export const RegisterForm = ({ loginText, registerText, isRegister }) => {
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const {
    visible,
    confirmVisible,
    handleChangeConfirmVisible,
    handleChangeVisible,
    navigateToLogin,
    navigateToRegister,
    handleSignInwithGoogle
  } = useRegisterFormLogic()

  const {
    handleRegister,
    isLoading: handleRegisterLoading
  } = useHandleRegister()
  const {
    handleLogin,
    isLoading,
    loginBlur,
    checkEmailLoading
  } = useHandleLogin()
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
          <p className='text-[#FFC901] font-bold text-4xl'>
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
                <InputField
                  register={register}
                  loginBlur={loginBlur}
                  errors={errors.email}
                  inputType='text'
                  labelName='Email'
                  placeholder='Enter your email address'
                  name='email'
                  registerName='email'
                  show={true}
                  icon={
                    <MailOutlineIcon className='scale-50 absolute left-0 -top-1' />
                  }
                />
                {isRegister && (
                  <InputField
                    register={register}
                    errors={errors.username}
                    inputType='text'
                    labelName='Username'
                    placeholder='Enter your username'
                    name='username'
                    registerName='username'
                    show={true}
                    icon={
                      <PermIdentityIcon className='scale-50 absolute left-0 -top-1' />
                    }
                  />
                )}

                <div className='relative w-[95%]  md:w-4/5'>
                  <PasswordInputField
                    labelName='Password'
                    placeholder='Enter your Password'
                    register={register}
                    errors={errors.password}
                    name='password'
                    visible={visible}
                    registerName='password'
                  />
                  <PasswordFooter
                    show={register}
                    isWeb={isWeb}
                    handleChangeVisible={handleChangeVisible}
                    visible={visible}
                  />
                </div>

                <div>
                  {isRegister && (
                    <div className='relative w-[95%]  md:w-4/5'>
                      <PasswordInputField
                        labelName='Confirm Password'
                        placeholder='Enter your Password'
                        register={register}
                        errors={errors.confirmPassword}
                        name='confirmPassword'
                        visible={confirmVisible}
                        registerName='confirmPassword'
                      />
                      <ConfirmPasswordFooter
                        confirmVisible={confirmVisible}
                        handleChangeConfirmVisible={handleChangeConfirmVisible}
                      />
                    </div>
                  )}
                </div>

                <div className=''>
                  <LoginButton
                    isRegister={isRegister}
                    isLoading={
                      isRegister
                        ? handleRegisterLoading
                        : isLoading || checkEmailLoading
                    }
                  />
                  {!isRegister && (
                    <GoogleLoginButton
                      isRegister={false}
                      handleSignInwithGoogle={handleSignInwithGoogle}
                    />
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

export const InputField = ({
  register,
  errors,
  name,
  labelName,
  placeholder,
  inputType,
  registerName,
  loginBlur,
  icon
}) => {
  return (
    <>
      <div className='space-y-2'>
        <p className='text-base'>{labelName}</p>
        <div className='relative'>
          <input
            autoComplete={name}
            type={inputType}
            {...register(`${registerName}`, {
              onBlur: loginBlur
            })}
            name={name}
            placeholder={placeholder}
            className='outline-none border-b-2 border-black px-6 w-[95%]  md:w-4/5 focus:border-[#FFC901]'
          />
          <p className='text-red-500 text-[8px]'>{errors?.message}</p>
          {icon}
        </div>
      </div>
    </>
  )
}
export const PasswordInputField = ({
  labelName,
  visible,
  register,
  placeholder,
  registerName,
  name,
  errors
}) => {
  return (
    <>
      <div className='space-y-2'>
        <p className='text-base'>{labelName}</p>
        <div className='relative'>
          <input
            type={visible ? 'text' : 'password'}
            autoComplete='current-password'
            placeholder={placeholder}
            {...register(`${registerName}`)}
            name={name}
            className='outline-none border-b-2 border-black px-6  w-full focus:border-[#FFC901]'
          />
          <p className='text-red-500 text-[8px]'>{errors?.message}</p>
          <HttpsOutlinedIcon className='scale-50 absolute left-0 -top-1' />
        </div>
      </div>
    </>
  )
}

export const PasswordFooter = ({
  show,
  visible,
  isWeb,
  handleChangeVisible
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div>
      {show && (
        <div className='flex justify-between mt-2 items-center'>
          <div className='flex items-center space-x-1'>
            <input
              type='checkbox'
              name='remember-me'
              className='accent-[#FFC901]'
            />
            <label htmlFor='remember-me' className='text-gray-500 text-[11px]'>
              Remember me
            </label>
          </div>
          <p
            className='cursor-pointer'
            onClick={() => {
              navigate('/forgot-password')
            }}
          >
            forgot password?
          </p>
        </div>
      )}
      {visible ? (
        <div onClick={handleChangeVisible}>
          <VisibilityOutlinedIcon className='scale-75 absolute right-0 text-gray-500 top-7 cursor-pointer' />
        </div>
      ) : (
        <div onClick={handleChangeVisible}>
          <VisibilityOffOutlinedIcon className='scale-75 absolute  right-0 text-gray-500 top-7 cursor-pointer' />

        </div>
      )}
    </div>
  )
}

export const ConfirmPasswordFooter = ({
  confirmVisible,
  handleChangeConfirmVisible
}) => {
  return (
    <div>
      {confirmVisible ? (
        <div onClick={handleChangeConfirmVisible}>
          <VisibilityOutlinedIcon className='scale-75 absolute cursor-pointer right-0 text-gray-500  top-7' />
        </div>
      ) : (
        <div onClick={handleChangeConfirmVisible}>
          <VisibilityOffOutlinedIcon className='scale-75 absolute cursor-pointer text-gray-500 right-0 top-7' />
        </div>
      )}
    </div>
  )
}

export const LoginButton = ({
  isLoading,
  isRegister,
  ComponentButtonName,
  isAnotherComponent
}) => {
  return (
    <button
      type='submit'
      disabled={isLoading}
      className='w-[95%]  md:w-4/5 text-center bg-[#FFC901] h-8 rounded-lg text-white '
    >
      {isLoading ? (
        <div className='scale-50 flex items-center justify-center'>
          <CircularProgress color='inherit' />
        </div>
      ) : isAnotherComponent ? (
        `${ComponentButtonName}`
      ) : isRegister ? (
        'Sign up'
      ) : (
        'Sign In '
      )}
    </button>
  )
}

const GoogleLoginButton = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='space-y-4'>
        <div className='text-center w-[95%]  md:w-4/5 mt-2'>
          <p className='text-gray-500  text-[9px]'>Or continue with</p>
        </div>
        <div
          onClick={() => {
            window.open(
              `${process.env.REACT_APP_BACKEND_URL}/api/google/login`,
              '_self'
            )
          }}
          className='w-[95%]  md:w-4/5 shadow-md'
        >
          <div className='flex items-center cursor-pointer justify-center'>
            <div className='scale-50'>
              <Logo />
            </div>
            <p>Sign in with google</p>
          </div>
        </div>
      </div>
    </div>
  )
}
