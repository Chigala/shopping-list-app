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
import { useGoogleLoginQuery } from './redux/api/user-slice'

function App () {
  // const user = useSelector(state => state.componentSlice.isAuth)
  const dispatch = useDispatch()
  const { isSuccess, data } = useGoogleLoginQuery()
  const [auth, setauth] = useState(
    JSON.parse(localStorage.getItem('auth')) || false
  )
  console.log(`this is the app auth state : ${auth}`)
  // const dispatch = useDispatch()
  // const [user, setuser] = useState(true)
  // console.log(`this is the app.js user: ${user}`)
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('auth')
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser)
  //     dispatch(updateAuth(foundUser))
  //   }
  // }, [])

  useEffect(() => {
    const handleAuthGoogleLogin = () => {
      if (data === true) {
        console.log(`it was successful: ${data}`)
        setauth(prev => !prev)
      localStorage.setItem('auth',data) 
      }else{
        setauth(prev => !prev)
      }    }
    handleAuthGoogleLogin()
    console.log(`this is the app state for the authValue: ${data}`)
  }, [data])

  return (
    <>
      <Router>
        <PositionedSnackbar />
        <Routes>
          <Route path='/' element={<LoginWrapper user={auth} />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='change-password/:id' element={<CreatePassword />} />
          </Route>
          <Route element={<HomePageWrapper user={auth}/>}>
            <Route path='homepage' element={<Homepage />} />
            <Route path='history' element={<History />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='itemform' element={<ItemForm />} />
            <Route path='item' element={<Item />} />
            {window.matchMedia('(max-width: 767px)').matches && (
              <Route path='listBar' element={<Cart />} />
            )}
            <Route path='history-details' element={<HistoryDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
export default App
