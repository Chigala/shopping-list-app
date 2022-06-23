import { useState } from "react"; 
import { useChangePasswordMutation } from "../../redux/api/user-slice";
import { useSelector, useDispatch } from "react-redux";
import { updateSnackbar } from "../../redux/snackbar";


export const useChangePasswordLogic = () => {
  const dispatch = useDispatch()
  const isWeb = !window.matchMedia('(max-width: 767px)').matches
  const [password, setPassword] = useState(""); 
  const[submitPasword, {isLoading}] = useChangePasswordMutation(); 
  const paramsId = useSelector(state => state.componentSlice.passwordParams)
  const handleChangePassword = ({password}) => {
    setPassword(password);
    uploadPassword()
  }
  const uploadPassword = async() => {
    const data = {
        password: password, 
        userId: paramsId
        
    }
    const api = await submitPasword(data);
    const value = api.data; 
    dispatch(
      isWeb
        ? updateSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarText: value.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
        : updateSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarText: value.msg,
            snackbarVertical: 'top',
            snackbarHorizontal: 'center'
          })
    )
  }
  return {
    handleChangePassword, 
    isLoading
  }
}
