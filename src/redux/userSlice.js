import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.phone = action.payload.phone ?? ''
            state.token = action.payload.token
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: state => {
            state.token = ''
            state.phone = ''
        }
    }
})

export const { login, setPhone, setToken, logout } = userSlice.actions

export default userSlice.reducer