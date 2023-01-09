import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginPopUpVisible: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoginPopUpStatus: (state, action) => {
            state.isLoginPopUpVisible = action.payload
        },
        toggleLoginPopUpStatus: state => {
            state.isLoginPopUpVisible = !state.isLoginPopUpVisible
        }
    }
})

export const { setLoginPopUpStatus, toggleLoginPopUpStatus } = uiSlice.actions

export default uiSlice.reducer