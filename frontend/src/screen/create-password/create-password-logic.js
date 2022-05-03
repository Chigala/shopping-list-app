import { useState } from "react"; 
import { useChangePasswordMutation } from "../../redux/api/user-slice";
import { useSelector } from "react-redux";


export const useChangePasswordLogic = () => {
  const [password, setPassword] = useState(""); 
  const[submitPasword] = useChangePasswordMutation(); 
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
    console.log(api.data); 
  }
  return {
    handleChangePassword
  }
}
