import React from 'react'

import { RegisterForm } from '../../components/register-form/register-form-folder/register-form'
import { SideImage } from './side-image'

// const loginText = 'If you already have an account registered'
const registerText = "If you have an account registered"
const register = true

export const Register = () => {
  return (
    <div className='w-screen h-screen flex flex-row'>
      <RegisterForm
        // loginText={loginText}
        registerText={registerText}
        isRegister={register}
      />
      <SideImage register={register}/>
     
    </div>
  )
}
