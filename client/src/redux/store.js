import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import categoriesReducer from '../redux/Categories/categoriesSlice';
import productsReducer from '../redux/Products/productsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        products: productsReducer,
    },
});

export default store;
