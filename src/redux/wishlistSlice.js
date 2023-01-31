import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [
        {
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            ratings: 4700,
            star: 4.0,
        },
    ],
    selected: [],
    isEditing: false
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        removeFromBag: (state, action) => {
            state.items = state.items.filter(item => item.clothId !== action.payload)
        },
        addSelected: (state, action) => {
            state.selected.push(action.payload)
        },
        removeSelected: (state, action) => {
            state.selected = state.selected.filter(item => item !== action.payload)
            if (state.selected.length === 1) state.isEditing = false
        },
        clearSelected: state => {
            state.items = state.items.filter(item => !state.selected.includes(item.clothId))
            state.selected = []
            state.isEditing = false
        },
        setIsEditing: (state, action) => {
            if (action.payload === true) state.selected = [-1]
            else state.selected = []
            state.isEditing = action.payload
        },
        reset: _ => initialState
    }
})

export const { removeFromBag, addSelected, removeSelected, clearSelected, setIsEditing, reset } = wishlistSlice.actions

export default wishlistSlice.reducer