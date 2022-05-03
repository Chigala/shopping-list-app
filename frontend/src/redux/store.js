import { configureStore } from '@reduxjs/toolkit';
import  ListBarSlice from "../redux/component-slice"
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/user-slice';



export default configureStore({
    reducer:{
        componentSlice:ListBarSlice, 
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

// setupListeners(configureStore.dispatch)