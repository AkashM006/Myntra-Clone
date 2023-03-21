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
    fcmToken: '',
    update: {
        show: null,
        update: null
    }
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
        setUpdate: (state, action) => {
            state.update = action.payload
        },
        logout: state => {
            let result = { ...initialState, update: state.update, fcmToken: state.fcmToken }
            return result
        }
    }
})

export const { login, setPhone, setToken, setProfile, setFcmToken, logout, setField, setUpdate } = userSlice.actions

export default userSlice.reducer