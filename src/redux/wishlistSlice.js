import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    selected: []
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {

    }
})

export const { } = wishlistSlice.actions

export default wishlistSlice.reducer