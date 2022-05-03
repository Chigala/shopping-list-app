
import { useState } from 'react'



export const useSnackBar = () => {
    
  const [state, setState] = useState({
      open: false, 
      vertical: "top", 
      horizontal: "center"
  })
  const{vertical, horizontal,open} = state; 
  const handleClick = (newState) => () => {
      console.log("it is calling")
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
     setState({...state,open:false })
    }

    return{
        handleClick,
        open, 
        handleClose, 
        vertical, 
        horizontal
    }
    
  }


