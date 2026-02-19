import {
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
} from './categoriesSlice';
const baseUrl = process.env.REACT_APP_BASE_URL;


export const addCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch(addCategoryStart());

        const { name, image } = categoryData;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'manyavar');

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/drijzhqfp/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        const data = await response.json();
        let category_img = data.url;

        await fetch(`${baseUrl}/category/create`, {
            method: "POST",
            body: JSON.stringify({ name, image: category_img }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                dispatch(addCategorySuccess())
            })
            .catch(err => console.log(err))

    } catch (error) {
        dispatch(addCategoryFailure(error.message));
    }
};


export const fetchCategories = (name) => async (dispatch) => {
    try {
        dispatch(fetchCategoriesStart());
        await fetch(`${baseUrl}/category/get?name=${name ? name : ""}`, {
            method: "GET",
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(fetchCategoriesSuccess(res.categories));
                }
            })
            .catch(err => {
                dispatch(fetchCategoriesFailure(err.msg));
                console.log(err)
            })

    } catch (error) {
        dispatch(fetchCategoriesFailure(error.message));
    }
};

export const getAllcategories = () => async (dispatch) => {
    try {
        await fetch(`${baseUrl}/category/get`, {
            method: "GET",
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(getAllcategoriesList(res.categories));
                }
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.log(error);
    }
}

export const editCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch(editCategoryStart());
        await fetch(`${baseUrl}/category/edit/${categoryData.id}`, {
            method: "PATCH",
            body: JSON.stringify(categoryData.payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                dispatch(editCategorySuccess());
                dispatch(fetchCategories());
            })
            .catch(err => console.log(err))


    } catch (error) {
        dispatch(editCategoryFailure(error.message));
    }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch(deleteCategoryStart());

        await fetch(`${baseUrl}/category/delete/${categoryId}`, {
            method: "DELETE",
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(deleteCategorySuccess());
                    dispatch(fetchCategories());
                }
            })
            .catch(err => {
                dispatch(deleteCategoryFailure(err.msg));
                console.log(err)
            })

    } catch (error) {
        dispatch(deleteCategoryFailure(error.message));
    }
};