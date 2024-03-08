import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationSlice'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const setUserLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.userLogin(credentials)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(
        setNotification({
          message: 'successfully logged in',
          style: 'success',
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: 'wrong username or password',
          style: 'error',
        })
      )
    }
  }
}

export const setUserLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(setUser(null))
    dispatch(
      setNotification({
        message: 'successfully logged out',
        style: 'success',
      })
    )
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const localUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (localUser) {
      dispatch(setUser(localUser))
    }
  }
}

export default userSlice.reducer
