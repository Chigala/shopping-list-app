import { useLoginUserMutation } from '../../redux/api/user-slice'
import { useGetProfileQuery } from '../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import { updateAuth } from '../../redux/component-slice'

export const useHandleLogin = () => {
  const [loginUser,{isLoading}] = useLoginUserMutation()
  const { data: userData } = useGetProfileQuery()
  const dispatch = useDispatch()
  const handleLogin = async data => {
    try {
      console.log('the button was pressed')
      // console.log(data); 
      const result = await loginUser(data)

      if (result.data) {
        //call the handle Click function to show the logging in snackbar
        // handleClick()
        const changeState = () => {
          dispatch(updateAuth(userData.user))
          localStorage.setItem('auth', userData.user)
        }
        setTimeout(changeState,0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    handleLogin,
    isLoading 
    
  }
}
