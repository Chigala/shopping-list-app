import { createSlice } from '@reduxjs/toolkit';
// const isLoggedIn = localStorage.getItem("auth");
const initialState = {
    screen : "house",
    registerData: "",
    loginData:"",
    isAuth: "", 
    passwordParams: ""
};

export const componentSlice = createSlice({
  name: 'componentSlice',
  initialState,
  reducers: {
    changeSidebarScreen: (state, action) => {
      state.screen = action.payload; 
    },
    registerFormData:(state,{payload}) => {
      state.registerData = payload;
    },
    loginFormData:(state,{payload}) => {
      state.loginData = payload;
    },
     updateAuth:(state,{payload}) => {
      state.isAuth = payload;
    },
    updatePasswordParams: (state,{payload}) => {
      state.passwordParams = payload; 
    }
  },
});

export const { changeSidebarScreen,registerFormData,loginFormData, updateAuth, updatePasswordParams } = componentSlice.actions;

export default componentSlice.reducer;