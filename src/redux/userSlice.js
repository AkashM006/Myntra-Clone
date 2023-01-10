import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPhone: (state, action) => {
            state.phone = action.payload
        }
    }
})

export const { setPhone } = userSlice.actions

export default userSlice.reducer