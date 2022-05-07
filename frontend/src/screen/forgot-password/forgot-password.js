import React from 'react'
import { InputField } from '../../components/register-form/register-form-folder/register-form'
import { SideImage } from '../register/side-image'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginButton } from '../../components/register-form/register-form-folder/register-form'
import { useForgotPasswordLogic } from './forgot-password-logic'
import { ForgotPasswordSchema } from '../../helpers/form-validation'
import { useShowSnackBar } from '../../components/show-snackbar'
import { useSnackBar } from '../../components/snackbar'

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    mode: 'onBlur'
  })
  const { handleCreate, isLoading, isError } = useForgotPasswordLogic()


  return (
    <div className='w-screen h-screen flex flex-row'>
      <div className='my-auto mx-auto space-y-5 w-screen md-w-4/5 px-4 '>
        <p className='text-[#FFD020] text-3xl'>Forgot password </p>
        <form className='space-y-5 w-4/5' onSubmit={handleSubmit(handleCreate)}>
          <InputField
            register={register}
            errors={errors.email}
            inputType='text'
            labelName='Email'
            placeholder='Enter your email'
            name='email'
            registerName='email'
            show={true}
            icon={
              <PermIdentityIcon className='scale-50 absolute left-0 -top-1' />
            }
          />
          <LoginButton
            isLoading={isLoading}
            isAnotherComponent={true}
            ComponentButtonName='Send email'
          />
        </form>
      </div>


      <SideImage />
    </div>
  )
}

// <div>{isError?handleShowSnackBar("email-unsuccessful"):handleShowSnackBar("passwordChanged")}</div>
