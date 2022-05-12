import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGoogleLoginQuery } from '../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import { updateAuth } from '../../redux/component-slice'
import { useSelector } from 'react-redux'


export const useRegisterFormLogic = () => {
  const dispatch = useDispatch()
  const isUser = useSelector(state => state.componentSlice.isAuth)
  // const { isSuccess, currentData } = useGoogleLoginQuery()
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

  // const handleSignInwithGoogle =  () => {
  //   window.open('http://localhost:5000/api/google/login', '_self')
  //   // handleChangeAuth()
  // }
  const handleChangeAuth = () => {
   console.log("chigala" ) 
  //  if(isSuccess){
  //    console.log("it was successful")
  //    dispatch(updateAuth(true)); 
  //   //  localStorage.setItem("auth", data.isLogginIn)
  //  }
  }
    // if (isSuccess) {
    //   console.log ("the dispatch worked")
    //   console.log(`this is the data: ${currentData.isLoggedIn}`)
    //   // localStorage.setItem('auth', data.isLoggedIn)
    // }
  return {
    visible,
    confirmVisible,
    handleChangeConfirmVisible,
    handleChangeVisible,
    navigateToLogin,
    navigateToRegister,
    // handleSignInwithGoogle
  }
}
