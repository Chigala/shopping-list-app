import React from 'react'
import { RegisterForm } from '../../components/register-form/register-form-folder/register-form'
import { SideImage } from '../register/side-image'

const loginText = "If you don't already have an account registered"
// const registerText = "If you have an account registered"
const register = false
export const Login = () => {
  return (
    <div className='w-screen h-screen flex flex-row'>
      <RegisterForm
        loginText={loginText}
        // registerText={registerText}
        isRegister={register}
      />
      <SideImage />
    </div>
  )
}
