import { useGoogleLogoutQuery } from '../../redux/api/user-slice'

export const useSideBarLogic = () => {
  const { isSuccess } = useGoogleLogoutQuery()
  const handleLogout = () => {
    if (isSuccess) {
      console.log('logout was successful')
      localStorage.removeItem('auth')
      window.location.reload()
    }
  }

  return {
    handleLogout
  }
}
