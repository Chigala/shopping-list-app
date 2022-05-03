import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ListBar } from './components/listbar/listbar'
import { Sidebar } from './components/sidebar/sidebar'
import { Homepage } from './screen/homepage/homepage'
import { Dashboard } from './screen/history-details/dashboard/dashboard'
import { History } from './screen/history/history'
import { Cart } from './components/listbar/cart/cart'
import { ItemForm } from './components/listbar/item-form/item-form'
import { Item } from './components/listbar/item/item'
import { HistoryDetails } from './screen/history-details/history-details'
import { Register } from './screen/register/register'
import { Login } from './screen/login/login'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateAuth } from './redux/component-slice'
import { CreatePassword } from './screen/create-password/create-password'

function App () {
  const user = useSelector(state => state.componentSlice.isAuth); 
  const dispatch = useDispatch(); 

  useEffect(() => {
   const loggedInUser = localStorage.getItem("auth"); 
   if(loggedInUser){
     const foundUser = JSON.parse(loggedInUser);
     dispatch(updateAuth(foundUser))
   }
  },[])
  
  return (
    <>
      {user ? (
        <Router>
          <div className='flex'>
            <div className=' w-fit bg-#FFFFFF'>
              <Sidebar />
            </div>
            <div className='flex-1 overflow-x-hidden'>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/history' element={<History />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/itemform' element={<ItemForm />} />
                <Route path='/item' element={<Item />} />
                {window.matchMedia('(max-width: 767px)').matches && (
                  <Route path='/listBar' element={<Cart />} />
                )}
                <Route path='/history-details' element={<HistoryDetails />} />
                <Route path='*' element={<Homepage />} />
              </Routes>
            </div>
            <div className='hidden md:inline w-fit'>
              <ListBar />
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/change-password/:id' element={<CreatePassword/>} />
            <Route path='*' element={<Login/>} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
