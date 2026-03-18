import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    // ← Reducer 
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload; 
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(i => i.id !== id);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;