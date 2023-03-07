import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: [], // for storing the ids of selected items in bag for proceding to checkout
    items: [], // storing the items
    itemIds: [], // for storing the ids of items in bag, to display count
    // { // sample format on how to store in state
    //     id: Math.random(),
    //     clothId: 1,
    //     brand: "Huetrap",
    //     name: 'Men White graphic printed cotton T-Shirt',
    //     soldBy: "Huetrap",
    //     mrp: 1399,
    //     discount: 29,
    //     qty: 2,
    //     image: 'https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11846942/2020/9/25/1dc647b4-d7c5-43ae-bb74-c1d215b1f7811601029474498-HRX-by-Hrithik-Roshan-Men-Jackets-5831601029472673-1.jpg',
    //     currentSize: 'S',
    //     hasError: false,
    //     others: {
    //         selectedItemsCount: 1,
    //         itemsCount: 1,
    //         coupon: {
    //             couponId: 2,
    //             couponCode: "EXTRA25OFF",
    //             minimumPurchase: 599,
    //             discountPercentage: 25,
    //             expiryDate: "2023-02-28",
    //             expiryTime: "23:59:00"
    //         },
    //         totalMrp: 1399,
    //         bagDiscount: 1007,
    //         couponDiscount: 98,
    //         convenienceFee: 99,
    //         total: 393
    //     }
    //     size: [
    //         {
    //             name: 'X',
    //             available: false,
    //             maxQty: 0
    //         },
    //         {
    //             name: 'S',
    //             available: true,
    //             maxQty: 3
    //         },
    //         {
    //             name: 'L',
    //             available: true,
    //             maxQty: 90
    //         }
    //     ]
    // },
}

export const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addToBag: (state, action) => {
            // this is used to keep track of the ids so that count can be displayed evreywhere
            // payload requires id of the cloth which is the productId + selectedSize
            state.items.push(action.payload)
        },
        setSelected: (state, action) => { // for either setting selected to 0 or all
            if (action.payload === 'all') {
                let result = state.items.map(item => item.id)
                state.selected = [...result]
            } else state.selected = []
        },
        removeSelection: (state, action) => { // for unselecting one specific item
            state.selected = state.selected.filter(id => id !== action.payload)
        },
        addSelection: (state, action) => { // for selecting one specific item
            state.selected.push(action.payload)
        },
        removeFromBag: (state, action) => {
            state.selected = state.selected.filter(id => id !== action.payload)
            state.items = state.items.filter(item => item.id !== action.payload)
            state.itemIds = state.items.filter(id => id !== action.payload)
        },
        removeSelected: state => {
            state.items = state.items.filter(item => !state.selected.includes(item.id))
            state.selected = []
        },
        editItem: (state, action) => {
            let { id } = action.payload
            let idx = state.items.findIndex(item => item.id === id)

            state.items.splice(idx, 1)

            let item = action.payload
            let selectedSize = item.currentSize
            selectedSize = item.size.find(s => s.name === selectedSize)
            item.id = item.clothId + item.currentSize
            item.mrp = selectedSize.amount

            const oldItem = state.items.find(value => item.id === value.id)

            if (oldItem) {
                oldItem.qty = item.qty + oldItem.qty > 10 ? 10 : item.qty + oldItem.qty
                idx = state.selected.indexOf(id)
                state.selected.splice(idx)
                idx = state.itemIds.indexOf(id)
                state.itemIds.splice(idx)
            } else {
                state.items.splice(idx, 0, item)
                idx = state.selected.indexOf(id)
                state.selected[idx] = item.id
                idx = state.itemIds.indexOf(id)
                state.itemIds[idx] = item.id
            }
        },
        setBag: (state, action) => {
            state.selected = action.payload.selected
            state.items = action.payload.items
            state.itemIds = action.payload.itemIds
            state.others = action.payload.others
        }
    }
})

export const { addToBag, addDummy, setSelected, removeSelection, addSelection, removeFromBag, removeSelected, editItem, setBag } = bagSlice.actions

export default bagSlice.reducer