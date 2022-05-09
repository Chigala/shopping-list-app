import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGoogleLoginQuery } from '../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import { updateAuth } from '../../redux/component-slice'

export const useRegisterFormLogic = () => {
  const dispatch = useDispatch()
  const { isSuccess, data } = useGoogleLoginQuery()
  const [visible, setVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const navigate = useNavigate()
  const handleChangeVisible = () => {
    setVisible(prev => !prev)
  }
  const handleChangeConfirmVisible = () => {
    setConfirmVisible(prev => !prev)
  }
  const navigateToLogin = () => {
    navigate('/login')
  }
  const navigateToRegister = () => {
    navigate('/register')
  }

  const handleSignInwithGoogle =  () => {
    window.open('http://localhost:5000/api/google/login', '_self')
  }
    if (isSuccess) {
      console.log ("the dispatch worked")
      dispatch(updateAuth(data.isLoggedIn))
      localStorage.setItem('auth', data.isLoggedIn)
    }
  return {
    visible,
    confirmVisible,
    handleChangeConfirmVisible,
    handleChangeVisible,
    navigateToLogin,
    navigateToRegister,
    handleSignInwithGoogle
  }
}
