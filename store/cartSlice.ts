import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  optionsSummary?: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

type AddCartItemPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddCartItemPayload>) => {
      const quantityToAdd = action.payload.quantity ?? 1;
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.price = action.payload.price;
        existingItem.optionsSummary = action.payload.optionsSummary;
        existingItem.imageUrl = action.payload.imageUrl ?? existingItem.imageUrl;
        return;
      }

      state.items.push({
        ...action.payload,
        quantity: quantityToAdd,
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const targetItem = state.items.find((item) => item.id === action.payload.id);

      if (!targetItem) {
        return;
      }

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        return;
      }

      targetItem.quantity = action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

