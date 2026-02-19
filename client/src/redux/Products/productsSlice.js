import { createSlice } from '@reduxjs/toolkit';

const getInitialCartCount = () => {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
        const parsedCart = JSON.parse(cartFromStorage);
        return parsedCart.length;
    }
    return 0;
};

const initialState = {
    products: [],
    isAdding: false,
    error: null,
    isAdded: false,
    isFetching: false,
    fetchError: null,
    isEditing: false,
    editError: null,
    isEdited: false,
    isDeleting: false,
    deleteError: null,
    isDeleted: false,
    cartCount: getInitialCartCount(),

};

const categoriesSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProductStart(state) {
            state.isAdding = true;
            state.error = null;
        },
        addProductSuccess(state) {
            state.isAdding = false;
            state.isAdded = true;
        },
        addProductFailure(state, action) {
            state.isAdding = false;
            state.error = action.payload;
        },
        fetchProductsStart(state) {
            state.isFetching = true;
            state.fetchError = null;
        },
        fetchProductsSuccess(state, action) {
            state.isFetching = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.isFetching = false;
            state.fetchError = action.payload;
        },
        editProductStart(state) {
            state.isEditing = true;
            state.editError = null;
        },
        editProductSuccess(state) {
            state.isEditing = false;
            state.isEdited = true;
        },
        editProductFailure(state, action) {
            state.isEditing = false;
            state.editError = action.payload;
        },
        deleteProductStart(state) {
            state.isDeleting = true;
            state.deleteError = null;
        },
        deleteProductSuccess(state) {
            state.isDeleting = false;
            state.isDeleted = true;
        },
        deleteProductFailure(state, action) {
            state.isDeleting = false;
            state.deleteError = action.payload;
        },
        addCartCount(state, payload) {
            state.cartCount = payload.payload
        }
    },
});

export const {
    addProductStart,
    addProductSuccess,
    addProductFailure,
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    editProductStart,
    editProductSuccess,
    editProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    addCartCount
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
