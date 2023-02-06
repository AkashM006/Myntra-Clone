import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginPopUpVisible: false,
    loading: false,
    hideLoader: false,
    hideShadow: false
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
        },
        setLoading: (state, action) => {
            // let { loading, hideLoader, hideShadow } = action.payload
            // state.loading = loading
            // state.hideLoader = hideLoader
            // state.hideShadow = hideShadow
            return { ...state, ...action.payload }
        },
        closeLoading: state => {
            state.loading = false
            state.hideLoader = false
            state.hideShadow = false
        }
    }
})

export const { setLoginPopUpStatus, toggleLoginPopUpStatus, setLoading, closeLoading } = uiSlice.actions

export default uiSlice.reducer