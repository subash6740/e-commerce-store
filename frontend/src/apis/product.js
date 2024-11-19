import API from '../utils/axios';

export const getProducts = async () => {
    const response = await API.get(`products`);
    return { products: response.data.products, categories: response.data.categories }
};

export const getProductById = async (id) => {
    const response = await API.get(`products/${id}`);
    return response.data
};

export const getProductsByCategories = async (categories) => {
    const response = await API.get('products/categories', { params: { categories } });
    return response.data
};