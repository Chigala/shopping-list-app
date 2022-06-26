import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screen: 'house',
  registerData: '',
  loginData: '',
  isLoggedIn: false,
  token: null, 
  user: null, 
  isAuth: '',
  passwordParams: '',
  openCategorySearchBar: false,
  sendSelectedCategory: '',
  itemData: {},
  listData: {},
  listId: '',
  listHistoryId: '',
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
    updateIsloggedIn: (state, { payload }) => {
      state.isLoggedIn = payload
    },
    updateAuth: (state, action) => {
      state.isAuth = action.payload
    },
    updatePasswordParams: (state, { payload }) => {
      state.passwordParams = payload
    },
    openSearchBar: (state, { payload }) => {
      state.openCategorySearchBar = payload
    },
    changeCategoryValue: (state, { payload }) => {
      state.sendSelectedCategory = payload
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    },
    sendDataToItem: (state, { payload }) => {
      state.itemData = payload
    },
    updateListData: (state, { payload }) => {
      state.listData = payload
    },
    getListId: (state, { payload }) => {
      state.listId = payload
    },
    getListHistoryId: (state, { payload }) => {
      state.listHistoryId = payload
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
  updateListData,
  getListId,
  getListHistoryId,
  updateIsloggedIn, 
  setCredentials,
  logOut
} = componentSlice.actions

export default componentSlice.reducer
