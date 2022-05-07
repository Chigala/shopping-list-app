import { useSelector, useDispatch } from 'react-redux'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { updateSnackbar } from '../redux/snackbar'

export const PositionedSnackbar = () => {
  const dispatch = useDispatch()
  const snackbarOpen = useSelector(state => state.snackbarSlice.snackbarOpen)

  const snackbarType = useSelector(state => state.snackbarSlice.snackbarType)

  const snackbarVertical = useSelector(
    state => state.snackbarSlice.snackbarVertical
  )
  const snackbarHorizontal = useSelector(
    state => state.snackbarSlice.snackbarHorizontal
  )
  const snackbarText = useSelector(state => state.snackbarSlice.snackbarText)

  const state = useSelector(state => state.snackbarSlice)

  // const [state, setState] = useState({
  //     open: false,
  //     vertical: "top",
  //     horizontal: "center"
  // })
  // const{vertical, horizontal,open} = state;
  // const handleClick = (newState) => () => {
  //     console.log("it is calling")
  //   setState({ open: true, ...newState });

  // };

  const handleClose = () => {
    //  setState({...state,open:false })
    dispatch(
      updateSnackbar({
        ...state,
        snackbarOpen: false
      })
    )
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        key={snackbarVertical + snackbarHorizontal}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarType}
          sx={{ width: '100%' }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  )
}
