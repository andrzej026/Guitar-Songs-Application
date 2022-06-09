import { configureStore } from '@reduxjs/toolkit'
import songsSlice from '../features/songs/songsSlice'
import userSlice from '../features/user/userSlice'

export const store = configureStore({
    reducer: { user: userSlice, songs: songsSlice },
})
