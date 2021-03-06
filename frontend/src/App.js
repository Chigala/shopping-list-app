import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Homepage } from './screen/homepage/homepage'
import { Dashboard } from './screen/history-details/dashboard/dashboard'
import { History } from './screen/history/history'
import { Cart } from './components/listbar/cart/cart'
import { ItemForm } from './components/listbar/item-form/item-form'
import { Item } from './components/listbar/item/item'
import { HistoryDetails } from './screen/history-details/history-details'
import { Register } from './screen/register/register'
import { Login } from './screen/login/login'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuth } from './redux/component-slice'
import { CreatePassword } from './screen/create-password/create-password'
import { ForgotPassword } from './screen/forgot-password/forgot-password'
import { PositionedSnackbar } from './components/snackbar'
import HomePageWrapper from './screen/homepage-wrapper'
import { LoginWrapper } from './screen/login-wrapper'
import { useGoogleLoginMutation } from './redux/api/user-slice'
import { updateIsloggedIn,setCredentials } from './redux/component-slice'
import { CartWrapper } from './screen/cartWrapper'
import { PersistLogin } from './screen/persist'
import Layout from './screen/layout'
import  {LoadingScreen}  from './components/loadingScreen'
import {updateSnackbar} from "./redux/snackbar"

function App () {
  const dispatch = useDispatch()
  const [googleLogin] = useGoogleLoginMutation()
  // const isLoggedIn = localStorage.getItem('isLoggedIn')

  //check if there is a req.user and then you authenticate the user
  // useEffect(() => {
  // // const loggedInUser = localStorage.getItem('auth')
  // //   if (loggedInUser) {
  // //     const foundUser = JSON.parse(loggedInUser)
  // //     dispatch(updateAuth(foundUser))
  // //   }
  // }, [])

  useEffect(() => {
    const handleAuthGoogleLogin = async () => {
      const response = await googleLogin()
      const dataValue = response.data
      console.log('this is the data value:', dataValue)
      if (dataValue) {
        dispatch(
          updateSnackbar({
            snackbarOpen: true,
            snackbarType: 'success',
            snackbarText: 'Logged in successful',
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        )
        dispatch(setCredentials(dataValue))
      }else{
        console.log("google login didn't work ")
      }
      // dispatch(updateAuth(data.user))
      // dispatch(updateIsloggedIn(data.isLoggedIn))
      // localStorage.setItem('auth', JSON.stringify(data.user))
      // localStorage.setItem('isLoggedIn', data.isLoggedIn)
    }
    handleAuthGoogleLogin()
  }, [])

  return (
    <>
      <Router>
        <PositionedSnackbar />
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route path='/' element={<LoginWrapper />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='change-password/:id' element={<CreatePassword />} />
          </Route>
          <Route element={<PersistLogin/>}>
            <Route element={<HomePageWrapper />}>
              <Route path='/homepage' element={<Homepage />} />
              <Route path='history' element={<History />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='item' element={<Item />} />
              <Route path='history-details' element={<HistoryDetails />} />
              <Route path='/listbar' element={<Cart />} />
              <Route path='itemform' element={<ItemForm />} />
            </Route>
            {/* <Route element={<CartWrapper />} />
              <Route path='/listbar' element={<Cart />} />
              <Route path='itemform' element={<ItemForm />} />
            <Route /> */}

          </Route>
            <Route path='loading' element={<LoadingScreen />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
export default App
