import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    items: []
}

export const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload
        },
    }
})

export const { setCount } = bagSlice.actions

export default bagSlice.reducer