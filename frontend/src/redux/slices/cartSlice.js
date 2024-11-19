import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action) {
            return action.payload;
        },

        addCart(state, action) {
            const { product } = action.payload;
            let updatedCart;
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                updatedCart = state.map((x) =>
                    x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                updatedCart = [...state, { ...product, quantity: 1 }];
            }

            return updatedCart;
        },

        delCart(state, action) {
            const { product } = action.payload;
            let updatedCart;
            const exist2 = state.find((x) => x.id === product.id);
            if (exist2.quantity === 1) {
                updatedCart = state.filter((x) => x.id !== exist2.id);
            } else {
                updatedCart = state.map((x) =>
                    x.id === product.id ? { ...x, quantity: x.quantity - 1 } : x
                );
            }

            return updatedCart;
        },

        emptyCart(state, action) {
            return []
        }
    }
});

export const { setCart, addCart, delCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
