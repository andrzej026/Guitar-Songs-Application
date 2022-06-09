import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allSongs: [],
    userSongs: [],
    songsPage: 1,
    songsLimit: 9,
    songsCount: 0,
}

export const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        addSong: (state, action) => {
            state.songs.push(action.payload)
        },

        setAllSongs: (state, action) => {
            state.allSongs = action.payload
        },

        setUserSongs: (state, action) => {
            state.userSongs = action.payload
        },

        setSongsCount: (state, action) => {
            state.songsCount = action.payload
        },

        setPage: (state, action) => {
            state.songsPage = action.payload
        },
    },
})

export const { addSong, setAllSongs, setUserSongs, setSongsCount, setPage } =
    songsSlice.actions
export default songsSlice.reducer
