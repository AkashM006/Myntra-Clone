import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    selected: null
}

export const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.splice(0, 0, action.payload)
        },
        removeData: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        },
        setRead: (state, action) => {
            let item = state.data.find(item => item.id === action.payload)
            item.read = true
        },
        clearAll: _ => initialState
    }
})

export const { addData, removeData, setSelected, setRead, clearAll } = NotificationSlice.actions

export default NotificationSlice.reducer