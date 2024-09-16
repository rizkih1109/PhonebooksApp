import { configureStore } from '@reduxjs/toolkit'
import phoneReducer from './phonebooks/phonebooksSlice'

export const store = configureStore({
  reducer: {
    users: phoneReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch