// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../redux/slice/CharactarSlice'

export const store = configureStore({
     reducer: {
          characters: characterReducer,
     },
})
