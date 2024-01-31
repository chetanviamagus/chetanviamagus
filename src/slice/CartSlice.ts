import { createSlice } from "@reduxjs/toolkit";
import { addItemReducer, removeItemReducer, clearCartReducer } from "slice/reducer/CartReducer";
import { IItem } from "view/View4";

export interface CartState {
  items: IItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: addItemReducer,
    removeItem: removeItemReducer,
    clearCart: clearCartReducer,
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
