import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { changeSidebarScreen } from '../../../redux/component-slice'
import {useFormLogic } from "../../listbar/item-form/item-form-logic"

export const useItemLogic = () => {
 const{handleChangeScreen} = useFormLogic() 
  // const [data, setData] = useState({
  //   name:"", 
  //   image:"", 
  //   description: "", 
  //   category: "", 
    
  // })
  const dispatch = useDispatch()
  const handleBack = () => {
    const data = 'item-form'
    dispatch(changeSidebarScreen(data))
  }
  const handleAddToList = () => {
    const data = 'default'
    dispatch(changeSidebarScreen(data))
  }
  const handleSubmitItemForm = (data) => {
    handleChangeScreen()
    console.log("the form is submitting")
    console.log(data)
  }
  return {
    handleBack,
    handleAddToList, 
    handleSubmitItemForm,
    
  }
}
