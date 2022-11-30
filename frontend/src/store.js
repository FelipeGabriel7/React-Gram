import { configureStore } from '@reduxjs/toolkit'

// Reducers components
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
import photoReducer from './slices/photoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: profileReducer,
    photos: photoReducer,
  },
})