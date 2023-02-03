import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: []
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.addresses.push(action.payload)
        },
        removeAddress: (state, action) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload)
        },
        clearAddresses: (state, action) => {
            state.addresses = []
        },
        setAddress: (state, action) => {
            state.addresses = action.payload
        }
    }
})

export const { addAddress, removeAddress, clearAddresses, setAddress } = addressSlice.actions

export default addressSlice.reducer