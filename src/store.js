import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Points to CartSlice in the same folder

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;
