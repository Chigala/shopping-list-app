import { createSlice } from '@reduxjs/toolkit'
const getDataFromLocalStorage = () => {
  // return JSON.parse(localStorage.getItem("auth")) || {};
  return ''
}
const initialState = {
  screen: 'house',
  registerData: '',
  loginData: '',
  isAuth: getDataFromLocalStorage(),
  passwordParams: '',
  openCategorySearchBar: false,
  sendSelectedCategory: '',
  itemData: {}
}

export const componentSlice = createSlice({
  name: 'componentSlice',
  initialState,
  reducers: {
    changeSidebarScreen: (state, action) => {
      state.screen = action.payload
    },
    registerFormData: (state, { payload }) => {
      state.registerData = payload
    },
    loginFormData: (state, { payload }) => {
      state.loginData = payload
    },
    updateAuth: (state, action) => {
      state.isAuth = action.payload
    },
    updatePasswordParams: (state, { payload }) => {
      state.passwordParams = payload
    },
    openSearchBar: ( state, {payload} ) => {
      state.openCategorySearchBar = payload;
    },
    changeCategoryValue: (state, { payload }) => {
      state.sendSelectedCategory = payload
    },
    sendDataToItem: (state, {payload}) => {
      state.itemData = payload; 
    }
  }
})

export const {
  changeSidebarScreen,
  registerFormData,
  loginFormData,
  updateAuth,
  updatePasswordParams,
  openSearchBar,
  changeCategoryValue,
  sendDataToItem,
} = componentSlice.actions

export default componentSlice.reducer
