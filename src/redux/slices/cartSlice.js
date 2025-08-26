import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    totalPrce: 0,
    items: [],
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem){
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrce = state.items.reduce((sum, obj) => { 
                return (obj.price * obj.count) + sum 
            }, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if(findItem) {
                findItem.count--;
            }
        },
        clearItem(state) {
            state.items = [];
            state.totalPrce = 0
        },
    },
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, minusItem, clearItem, } = cartSlice.actions;

export default cartSlice.reducer;