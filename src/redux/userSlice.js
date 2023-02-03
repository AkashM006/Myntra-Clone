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
    fcmToken: ''
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
            let init = initialState.user
            let payload = action.payload
            state.user = { ...init, ...payload }
        },
        setFcmToken: (state, action) => {
            state.fcmToken = action.payload
        },
        setField: (state, action) => {
            const { field, value } = action.payload
            state.user[field] = value
        },
        logout: state => {
            let fcmToken = state.fcmToken
            let result = { ...initialState }
            result.fcmToken = fcmToken
            return result
        }
    }
})

export const { login, setPhone, setToken, setProfile, setFcmToken, logout, setField } = userSlice.actions

export default userSlice.reducer