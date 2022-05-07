// import { Alert } from '@mui/material'
// import { Snackbar } from '@mui/material'
// import { useSnackBar } from './snackbar'

// export const useShowSnackBar = () => {
//   const { handleClose, open, vertical, horizontal } = useSnackBar()
//   const handleShowSnackBar = data => {
//     switch (data) {
//       case 'login-success':
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='success'
//               sx={{ width: '100%' }}
//             >
//               The login was successful
//             </Alert>
//           </Snackbar>
//         )

//       case 'login-failure':
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='warning'
//               sx={{ width: '100%' }}
//             >
//               Incorrect username and password
//             </Alert>
//           </Snackbar>
//         )

//       case 'register-successful':
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='success'
//               sx={{ width: '100%' }}
//             >
//               You have been registered successfully
//             </Alert>
//           </Snackbar>
//         )

//       case 'email-successful':
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='success'
//               sx={{ width: '100%' }}
//             >
//               An email has been sent successfully
//             </Alert>
//           </Snackbar>
//         )

//       case 'email-unsuccessful':
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='warning'
//               sx={{ width: '100%' }}
//             >
//               Email not found! please input another email
//             </Alert>
//           </Snackbar>
//         )

//       case 'passwordChanged':
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='success'
//               sx={{ width: '100%' }}
//             >
//               Password has been changed successfully
//             </Alert>
//           </Snackbar>
//         )
//       default:
//         return (
//           <Snackbar>
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={handleClose}
//             key={vertical + horizontal}
//             <Alert
//               onClose={handleClose}
//               severity='success'
//               sx={{ width: '100%' }}
//             >
//               successful
//             </Alert>
//           </Snackbar>
//         )
//     }
//   }
//   return {
//     handleShowSnackBar
//   }
// }
