import API from '../utils/axios';

export const getCart = async () => {
    const response = await API.get('cart');
    return response.data || [];
};

export const addCart = async (product) => {
    await API.post('add_cart_item', { productId: product.id })
}

export const delCart = async (product) => {
    await API.post('delete_cart_item', { productId: product.id })
}

export const emptyCart = async () => {
    API.post('empty_cart')
}
