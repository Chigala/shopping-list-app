import { useDispatch } from 'react-redux'
import { changeSidebarScreen } from '../../../redux/component-slice'
import {useFormLogic } from "../../listbar/item-form/item-form-logic"
import { useSelector } from 'react-redux'
import { changeCategoryValue } from '../../../redux/component-slice'

export const useItemLogic = (catgoryValue) => {
 const{handleChangeScreen} = useFormLogic() 
  // const [data, setData] = useState({
  //   name:"", 
  //   image:"", 
  //   description: "", 
  //   category: "", 
    
  // })
  const dispatch = useDispatch()

  const selectedCategory = useSelector(state => state.componentSlice.sendSelectedCategory)
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
    const categoryData = {
      category: selectedCategory||catgoryValue
    }
    console.log(`this is the handleForm submit categoryVAlue: ${catgoryValue}`)
    console.log("the form is submitting")
    console.log({...data,...categoryData})
    dispatch(changeCategoryValue(""))
  }
  return {
    handleBack,
    handleAddToList, 
    handleSubmitItemForm,
    
  }
}
