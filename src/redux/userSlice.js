import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        phone: '',
        altMobNumber: '',
        birthDay: '',
        email: '',
        fullName: '',
        gender: '',
        hintName: '',
        mobileNumber: '',
        location: '',
    },
    token: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user.phone = action.payload.phone ?? ''
            state.token = action.payload.token
        },
        setPhone: (state, action) => {
            state.user.phone = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setProfile: (state, action) => {
            // state.altMobNumber = action.payload.altMobNumber ?? ''
            // state.birthDay = action.payload.birthDay ?? ''
            // state.email = action.payload.email ?? ''
            // state.fullName = action.payload.fullName ?? ''
            // state.gender = action.payload.gender
            // state.hintName = action.payload.hintName ?? ''
            // state.mobileNumber = action.payload.mobileNumber
            // state.location = action.payload.location ?? ''
            let init = initialState.user
            let payload = action.payload
            state.user = { ...init, ...payload }
        },
        logout: () => initialState
    }
})

export const { login, setPhone, setToken, setProfile, logout } = userSlice.actions

export default userSlice.reducer