import { configureStore } from '@reduxjs/toolkit'
import ListBarSlice from '../redux/component-slice'
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/user-slice'
import snackbarSlice from '../redux/snackbar'
export default configureStore({
  reducer: {
    componentSlice: ListBarSlice,
     snackbarSlice,
   [userApi.reducerPath]: userApi.reducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApi.middleware),
})

// setupListeners(configureStore.dispatch)
