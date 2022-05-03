import React from 'react'
import { RegisterForm } from '../../components/register-form/register-form'
import { SideImage } from '../register/side-image'

const loginText = 'If you already have an account registered'
const registerText = "If you don't have an account registered"
const register = false
export const Login = () => {
  return (
    <div className='w-screen h-screen flex flex-row'>
      <RegisterForm
        loginText={loginText}
        registerText={registerText}
        isRegister={register}
      />
      <SideImage />
    </div>
  )
}
