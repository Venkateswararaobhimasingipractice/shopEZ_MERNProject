import {
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
} from './productsSlice';
const baseUrl = process.env.REACT_APP_BASE_URL;

export const addProduct = (categoryData) => async (dispatch) => {
    try {

        dispatch(addProductStart());

        const { title, description, price, category, image } = categoryData;

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
        let product_img = data.url;

        await fetch(`${baseUrl}/product/create`, {
            method: "POST",
            body: JSON.stringify({ title, description, price, category, image: product_img }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                dispatch(addProductSuccess())
            })
            .catch(err => console.log(err))

    } catch (error) {
        dispatch(addProductFailure(error.message));
    }
};


export const fetchProducts = (title = "", category = "", price = "", order = "") => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());
        await fetch(`${baseUrl}/product/get?title=${title}&category=${category}&sort=${price}&order=${order}`, {
            method: "GET",
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(fetchProductsSuccess(res.products));
                }
            })
            .catch(err => {
                dispatch(fetchProductsFailure(err.msg));
                console.log(err)
            })

    } catch (error) {
        dispatch(fetchProductsFailure(error.message));
    }
};

export const editProduct = (productData) => async (dispatch) => {
    try {

        dispatch(editProductStart());
        await fetch(`${baseUrl}/product/edit/${productData.id}`, {
            method: "PATCH",
            body: JSON.stringify(productData.payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                dispatch(editProductSuccess());
                dispatch(fetchProducts());
            })
            .catch(err => console.log(err))


    } catch (error) {
        dispatch(editProductFailure(error.message));
    }
};

export const deleteProduct = (selectedProducts) => async (dispatch) => {
    try {
        dispatch(deleteProductStart());

        await fetch(`${baseUrl}/product/delete`, {
            method: "DELETE",
            body: JSON.stringify({ productIds: selectedProducts }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(deleteProductSuccess());
                    dispatch(fetchProducts());
                }
            })
            .catch(err => {
                dispatch(deleteProductFailure(err.msg));
                console.log(err)
            })

    } catch (error) {
        dispatch(deleteProductFailure(error.message));
    }
};

export const addingCartCount = (payload) => (dispatch) => {
    try {
        dispatch(addCartCount(payload));
    } catch (err) {
        console.error('Error adding cart count:', err);
    }
};
