import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    style: '',
  },
  reducers: {
    createNotification(state, action) {
      return (state = action.payload)
    },
    disableNotification() {
      return ''
    },
  },
})

export const { createNotification, disableNotification } =
  notificationSlice.actions

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch(createNotification(notification))
    setTimeout(() => dispatch(disableNotification()), 5000)
  }
}

export default notificationSlice.reducer
