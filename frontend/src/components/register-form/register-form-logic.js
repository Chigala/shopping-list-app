import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const useRegisterFormLogic = () => {
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
  const handleForgotPassword = () => {
    
  }
  
  return {
    visible,
    confirmVisible,
    handleChangeConfirmVisible,
    handleChangeVisible,
    navigateToLogin,
    navigateToRegister,
    
  }
}
