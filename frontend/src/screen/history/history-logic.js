import { useNavigate } from "react-router-dom"

export const useHistoryLogic = () => {
  const navigate = useNavigate(); 
   const handleChangeScreen = () => {
       navigate("/history-details")
   }
   return{
       handleChangeScreen
   }
}