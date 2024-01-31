import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "slice/CartSlice";
import { deepCopy } from "util/CommonUtil";
import { IItem } from "view/View4/View4";

export const addItemReducer = (state: CartState, action: PayloadAction<IItem>) => {
  const isAvailable = !!state.items?.find((item) => {
    return item.uid === action.payload.uid;
  });
  if (!isAvailable) {
    state.items.push(action.payload);
  }
};

export const removeItemReducer = (state: CartState, action: PayloadAction<IItem>) => {
  const newItems: IItem[] = state.items?.filter((item) => {
    return item.uid !== action.payload.uid;
  });

  return {
    ...state,
    items: newItems,
  };
};

export const clearCartReducer = (state: CartState) => {
  return { items: [] };
};
