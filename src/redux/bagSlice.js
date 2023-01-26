import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: [],
    items: [
        {
            id: Math.random(),
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            qty: 2,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            currentSize: 'S',
            hasError: false,
            size: [
                {
                    name: 'X',
                    available: false,
                    maxQty: 0
                },
                {
                    name: 'S',
                    available: true,
                    maxQty: 3
                },
                {
                    name: 'L',
                    available: true,
                    maxQty: 90
                }
            ]
        },
        {
            id: Math.random(),
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            qty: 2,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            currentSize: 'S',
            hasError: false,
            size: [
                {
                    name: 'X',
                    available: false,
                    maxQty: 0
                },
                {
                    name: 'S',
                    available: true,
                    maxQty: 3
                },
                {
                    name: 'L',
                    available: true,
                    maxQty: 90
                }
            ]
        },
        {
            id: Math.random(),
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            qty: 2,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            currentSize: 'S',
            hasError: false,
            size: [
                {
                    name: 'X',
                    available: false,
                    maxQty: 0
                },
                {
                    name: 'S',
                    available: true,
                    maxQty: 3
                },
                {
                    name: 'L',
                    available: true,
                    maxQty: 90
                }
            ]
        },
        {
            id: Math.random(),
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            qty: 2,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            currentSize: 'S',
            hasError: false,
            size: [
                {
                    name: 'X',
                    available: false,
                    maxQty: 0
                },
                {
                    name: 'S',
                    available: true,
                    maxQty: 3
                },
                {
                    name: 'L',
                    available: true,
                    maxQty: 90
                }
            ]
        },
        {
            id: Math.random(),
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            qty: 2,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            currentSize: 'S',
            hasError: false,
            size: [
                {
                    name: 'X',
                    available: false,
                    maxQty: 0
                },
                {
                    name: 'S',
                    available: true,
                    maxQty: 3
                },
                {
                    name: 'L',
                    available: true,
                    maxQty: 90
                }
            ]
        },
        {
            id: Math.random(),
            clothId: 1,
            brand: "Huetrap",
            name: 'Men White graphic printed cotton T-Shirt',
            soldBy: "Huetrap",
            mrp: 1399,
            discount: 29,
            qty: 2,
            image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
            currentSize: 'S',
            hasError: false,
            size: [
                {
                    name: 'X',
                    available: false,
                    maxQty: 0
                },
                {
                    name: 'S',
                    available: true,
                    maxQty: 0
                },
                {
                    name: 'L',
                    available: true,
                    maxQty: 90
                }
            ]
        }
    ]
}

export const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addToBag: (state, action) => {
            state.items.push(action.payload)
        },
        addDummy: (state, action) => {
            state.items.push({
                id: Math.random(),
                clothId: 1,
                brand: "Huetrap",
                name: 'Men White graphic printed cotton T-Shirt',
                soldBy: "Huetrap",
                mrp: 1399,
                qty: 2,
                image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
                currentSize: 'S',
                hasError: false
            })
        },
        setSelected: (state, action) => {
            if (action.payload === 'all') {
                let result = state.items.map(item => item.id)
                state.selected = [...result]
            } else {
                state.selected = []
            }
        },
        removeSelection: (state, action) => {
            state.selected = state.selected.filter(id => id !== action.payload)
        },
        addSelection: (state, action) => {
            state.selected.push(action.payload)
        },
        removeFromBag: (state, action) => {
            state.selected = state.selected.filter(id => id !== action.payload)
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        removeSelected: state => {
            state.items = state.items.filter(item => !state.selected.includes(item.id))
            state.selected = []
        },
        editItem: (state, action) => {
            let { id } = action.payload
            let idx = state.items.findIndex(item => item.id === id)
            state.items[idx] = { ...action.payload }
        }
    }
})

export const { addToBag, addDummy, setSelected, removeSelection, addSelection, removeFromBag, removeSelected, editItem } = bagSlice.actions

export default bagSlice.reducer