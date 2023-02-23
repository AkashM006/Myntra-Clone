import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: [],
    selected: null,
    editing: null,
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.addresses.push(...action.payload)
            if (state.addresses.length !== 0)
                state.selected = state.addresses[0].id
        },
        removeAddress: (state, action) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload)
        },
        clearAddresses: state => {
            state.addresses = []
        },
        setAddress: (state, action) => {
            state.addresses = action.payload
            if (state.addresses.length !== 0)
                state.selected = state.addresses[0].id
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        },
        setEditing: (state, action) => {
            state.editing = action.payload
        }
    }
})

export const { addAddress, removeAddress, clearAddresses, setAddress, setSelected, setEditing } = addressSlice.actions

export default addressSlice.reducer