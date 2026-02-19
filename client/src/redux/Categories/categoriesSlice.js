import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    allCategories: [],
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
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategoryStart(state) {
            state.isAdding = true;
            state.error = null;
        },
        addCategorySuccess(state) {
            state.isAdding = false;
            state.isAdded = true;
        },
        addCategoryFailure(state, action) {
            state.isAdding = false;
            state.error = action.payload;
        },
        fetchCategoriesStart(state) {
            state.isFetching = true;
            state.fetchError = null;
        },
        fetchCategoriesSuccess(state, action) {
            state.isFetching = false;
            state.categories = action.payload;
        },
        getAllcategoriesList(state, action) {
            state.allCategories = action.payload;
        },
        fetchCategoriesFailure(state, action) {
            state.isFetching = false;
            state.fetchError = action.payload;
        },
        editCategoryStart(state) {
            state.isEditing = true;
            state.editError = null;
        },
        editCategorySuccess(state) {
            state.isEditing = false;
            state.isEdited = true;
        },
        editCategoryFailure(state, action) {
            state.isEditing = false;
            state.editError = action.payload;
        },
        deleteCategoryStart(state) {
            state.isDeleting = true;
            state.deleteError = null;
        },
        deleteCategorySuccess(state) {
            state.isDeleting = false;
            state.isDeleted = true;
        },
        deleteCategoryFailure(state, action) {
            state.isDeleting = false;
            state.deleteError = action.payload;
        },
    },
});

export const {
    addCategoryStart,
    addCategorySuccess,
    addCategoryFailure,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    editCategoryStart,
    editCategorySuccess,
    editCategoryFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure,
    getAllcategoriesList
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
