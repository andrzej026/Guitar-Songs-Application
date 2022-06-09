import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state) => {
            state.isAuth = !state.isAuth
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { setIsAuth, setUser } = userSlice.actions
export default userSlice.reducer
