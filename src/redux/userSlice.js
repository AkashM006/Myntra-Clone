import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setPhone, setToken } = userSlice.actions

export default userSlice.reducer