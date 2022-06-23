import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      '^(?=.*[a-z])(?=.*[!@#$%^&=*])(?=.{8,})',
      'password(8) contain at least one special character '
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required')
})
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      '^(?=.*[a-z])(?=.*[!@#$%^&=*])(?=.{8,})',
      'password(8) contain at least one special character '
    )
})
export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      '^(?=.*[a-z])(?=.*[!@#$%^&=*])(?=.{8,})',
      'password(8) contain at least one special character '
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required')
})

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  })