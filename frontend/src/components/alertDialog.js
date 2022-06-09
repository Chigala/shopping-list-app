import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { Box } from '@mui/system'
import ClearIcon from '@mui/icons-material/Clear';
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { IconButton } from '@mui/material'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export function AlertDialogComponent ({
  text,
  open,
  handleClickOpen,
  handleClose,
  handleSubmit
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >

        <Box  sx={{
            textAlign: "right"
        }}>
            <IconButton sx={{
                borderRadius: "10px"
            }} onClick={handleClose}  color='primary'>
            <ClearIcon sx={{color: "red"}}/>
            </IconButton>
        </Box>
        <DialogTitle>{text}</DialogTitle>
        <DialogActions>
          <Button
            sx={{
              color: 'red'
            }}
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
