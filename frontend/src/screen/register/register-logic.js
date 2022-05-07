import { useRegisterUserMutation } from '../../redux/api/user-slice'

export const useHandleRegister = () => {
  const [registerUser, { data, isLoading }] = useRegisterUserMutation()
  const handleRegister = ({ confirmPassword, ...others }) => {
    registerUser({ ...others })
    console.log(data)
  }
  return {
    handleRegister, 
  }
}
