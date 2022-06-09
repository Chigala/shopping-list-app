
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbarType: "success", 
    snackbarText: "noting to display", 
    snackbarVertical:"top",
    snackbarHorizontal:"center",
    snackbarOpen: false, 
};

export const modalSlice  = createSlice({
  name: 'bar',
  initialState,
  reducers: {
    updateSnackbar: (state, {payload}) => {
         state.snackbarOpen = payload.snackbarOpen
         state.snackbarType = payload.snackbarType
         state.snackbarText = payload.snackbarText
         state.snackbarVertical = payload.snackbarVertical
         state.snackbarHorizontal = payload.snackbarHorizontal      
    },
  },
});

export const { updateSnackbar } = modalSlice.actions;

export default modalSlice.reducer;